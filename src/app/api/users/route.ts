import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import Order from '@/lib/models/Order';

// Middleware to verify token
async function verifyToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    throw new Error('Access denied');
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    return verified;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Middleware to check admin role
async function verifyAdmin(userId: string) {
  const user = await User.findById(userId);
  if (user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return user;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const user = await verifyToken(request);
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      await verifyAdmin(user.userId);
      const totalUsers = await User.countDocuments();
      const totalAdmins = await User.countDocuments({ role: 'admin' });
      const totalOrders = await Order.countDocuments();
      const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
      const processingOrders = await Order.countDocuments({ orderStatus: 'processing' });
      const completedOrders = await Order.countDocuments({ orderStatus: 'completed' });

      return NextResponse.json({
        totalUsers,
        totalAdmins,
        totalOrders,
        pendingOrders,
        processingOrders,
        completedOrders,
      });
    }

    // Get all users (admin only)
    await verifyAdmin(user.userId);
    const users = await User.find().select('-password');
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}