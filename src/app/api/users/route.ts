import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { query, toPublicUser, type PublicUser } from '@/lib/db';

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
  const result = await query<{ role: 'user' | 'admin' }>('SELECT role FROM users WHERE id = $1', [userId]);
  const user = result.rows[0];
  if (!user || user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return user;
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const pathname = new URL(request.url).pathname;

    if (action === 'stats' || pathname.endsWith('/stats/dashboard')) {
      await verifyAdmin(user.userId);
      const result = await query<{
        totalUsers: string;
        totalAdmins: string;
        totalOrders: string;
        pendingOrders: string;
        processingOrders: string;
        completedOrders: string;
      }>(`
        SELECT
          (SELECT COUNT(*) FROM users) AS "totalUsers",
          (SELECT COUNT(*) FROM users WHERE role = 'admin') AS "totalAdmins",
          (SELECT COUNT(*) FROM orders) AS "totalOrders",
          (SELECT COUNT(*) FROM orders WHERE order_status = 'pending') AS "pendingOrders",
          (SELECT COUNT(*) FROM orders WHERE order_status = 'processing') AS "processingOrders",
          (SELECT COUNT(*) FROM orders WHERE order_status = 'completed') AS "completedOrders"
      `);
      const stats = result.rows[0];

      return NextResponse.json({
        totalUsers: Number(stats.totalUsers),
        totalAdmins: Number(stats.totalAdmins),
        totalOrders: Number(stats.totalOrders),
        pendingOrders: Number(stats.pendingOrders),
        processingOrders: Number(stats.processingOrders),
        completedOrders: Number(stats.completedOrders),
      });
    }

    await verifyAdmin(user.userId);
    const users = await query<PublicUser>(`
      SELECT
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
      FROM users
      ORDER BY created_at DESC
    `);
    return NextResponse.json(users.rows.map(toPublicUser));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
