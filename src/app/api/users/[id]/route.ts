import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { query, toPublicUser, type PublicUser } from '@/lib/db';

async function verifyToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    throw new Error('Access denied');
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

async function verifyAdmin(userId: string) {
  const result = await query<{ role: 'user' | 'admin' }>('SELECT role FROM users WHERE id = $1', [userId]);
  const user = result.rows[0];

  if (!user || user.role !== 'admin') {
    throw new Error('Admin access required');
  }

  return user;
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(request);
    await verifyAdmin(user.userId);

    const body = await request.json();
    const { email, nickname, role } = body;

    const result = await query<PublicUser>(
      `
        UPDATE users
        SET
          email = COALESCE($1, email),
          nickname = COALESCE($2, nickname),
          role = COALESCE($3::user_role, role)
        WHERE id = $4
        RETURNING
          id,
          email,
          nickname,
          full_name AS "fullName",
          phone_number AS "phoneNumber",
          role,
          balance,
          game_accounts AS "gameAccounts",
          created_at AS "createdAt",
          updated_at AS "updatedAt"
      `,
      [email, nickname, role, params.id],
    );
    const updatedUser = result.rows[0];

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(toPublicUser(updatedUser));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(request);
    await verifyAdmin(user.userId);

    const result = await query('DELETE FROM users WHERE id = $1 RETURNING id', [params.id]);
    if (!result.rowCount) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
