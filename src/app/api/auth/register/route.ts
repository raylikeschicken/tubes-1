import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, password, nickname, fullName, phoneNumber } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    // Set role to 'admin' if email is admin@example.com (for demo)
    const role = email === 'admin@example.com' ? 'admin' : 'user';

    const user = new User({
      email,
      password: hashedPassword,
      nickname,
      fullName: fullName || nickname,
      phoneNumber,
      role,
    });

    await user.save();
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}