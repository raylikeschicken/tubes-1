const express = require('express');
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
  const User = require('../models/User');
  try {
    const user = await User.findById(req.user.userId);
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all top up products
router.get('/', async (req, res) => {
  try {
    const { game, category } = req.query;
    let query = { status: 'active' };
    if (game) query.game = game;
    if (category) query.category = category;
    
    const products = await TopUpProduct.find(query);
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await TopUpProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create product (admin)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = new TopUpProduct(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update product (admin)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await TopUpProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product (admin)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await TopUpProduct.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
