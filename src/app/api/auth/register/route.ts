import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, password, nickname, fullName, phoneNumber } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email === 'admin@example.com' ? 'admin' : 'user';

    await query(
      `
        INSERT INTO users (email, password, nickname, full_name, phone_number, role)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [email, hashedPassword, nickname, fullName || nickname, phoneNumber, role],
    );

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
