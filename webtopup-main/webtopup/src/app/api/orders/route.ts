import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import User from '@/lib/models/User';

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

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const user = await verifyToken(request);
    const body = await request.json();

    const now = new Date();
    const receiptNumber = body.receiptNumber || `RCPT-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const order = new Order({
      ...body,
      userId: user.userId,
      receiptNumber,
      paymentStatus: body.paymentStatus || 'confirmed',
      orderStatus: body.orderStatus || 'completed',
      paidAt: body.paidAt || now,
      completedAt: body.completedAt || now,
    });

    await order.save();
    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const user = await verifyToken(request);
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');

    if (admin === 'all') {
      await verifyAdmin(user.userId);
      const orders = await Order.find().populate('userId', 'email fullName nickname').sort({ createdAt: -1 });
      return NextResponse.json(orders);
    }

    const orders = await Order.find({ userId: user.userId }).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}