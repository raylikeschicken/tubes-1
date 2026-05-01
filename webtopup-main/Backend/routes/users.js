const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const TopUpProduct = require('../models/TopUpProduct');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Middleware to check admin role
const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users (admin)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user (admin)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { email, nickname, role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { email, nickname, role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user (admin)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Promote user to admin (admin only)
router.put('/:id/promote', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: 'admin' }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get dashboard stats (admin)
router.get('/stats/dashboard', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    const processingOrders = await Order.countDocuments({ orderStatus: 'processing' });
    const completedOrders = await Order.countDocuments({ orderStatus: 'completed' });
    const totalProducts = await TopUpProduct.countDocuments();
    const activeProducts = await TopUpProduct.countDocuments({ status: 'active' });

    res.json({
      totalUsers,
      totalAdmins,
      totalOrders,
      pendingOrders,
      processingOrders,
      completedOrders,
      totalProducts,
      activeProducts,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
