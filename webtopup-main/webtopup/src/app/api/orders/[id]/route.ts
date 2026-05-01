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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const user = await verifyToken(request);
    const order = await Order.findById(params.id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.userId.toString() !== user.userId && user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const user = await verifyToken(request);
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'status') {
      await verifyAdmin(user.userId);
      const { paymentStatus, orderStatus } = body;
      const updateData: any = {};

      if (paymentStatus) updateData.paymentStatus = paymentStatus;
      if (orderStatus) {
        updateData.orderStatus = orderStatus;
        if (orderStatus === 'completed') {
          updateData.completedAt = new Date();
        }
      }

      const order = await Order.findByIdAndUpdate(params.id, updateData, { new: true });
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(order);
    }

    if (action === 'confirm-payment') {
      const { proofImage } = body;
      const order = await Order.findByIdAndUpdate(
        params.id,
        { paymentStatus: 'pending', proofImage },
        { new: true }
      );
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(order);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const user = await verifyToken(request);
    await verifyAdmin(user.userId);

    const order = await Order.findByIdAndDelete(params.id);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}