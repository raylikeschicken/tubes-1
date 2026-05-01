const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
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

// Create top up order
router.post('/', verifyToken, async (req, res) => {
  try {
    const now = new Date();
    const receiptNumber = req.body.receiptNumber || `RCPT-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const order = new Order({
      ...req.body,
      userId: req.user.userId,
      receiptNumber,
      paymentStatus: req.body.paymentStatus || 'confirmed',
      orderStatus: req.body.orderStatus || 'completed',
      paidAt: req.body.paidAt || now,
      completedAt: req.body.completedAt || now,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all orders (admin)
router.get('/admin/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'email fullName nickname').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user orders
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get order details
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update order status (admin)
router.put('/:id/status', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { paymentStatus, orderStatus } = req.body;
    const updateData = {};
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (orderStatus) {
      updateData.orderStatus = orderStatus;
      if (orderStatus === 'completed') {
        updateData.completedAt = new Date();
      }
    }
    
    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Confirm payment (user uploads proof)
router.put('/:id/confirm-payment', verifyToken, async (req, res) => {
  try {
    const { proofImage } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: 'pending', proofImage },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete order (admin)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
