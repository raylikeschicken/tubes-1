import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { query, toOrder, type DbOrder, type PublicUser } from '@/lib/db';

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

const orderSelect = `
  id,
  user_id AS "userId",
  product_id AS "productId",
  product_name AS "productName",
  nominal,
  price,
  discount,
  final_price AS "finalPrice",
  game,
  game_username AS "gameUsername",
  game_user_id AS "gameUserId",
  payment_method AS "paymentMethod",
  payment_status AS "paymentStatus",
  order_status AS "orderStatus",
  receipt_number AS "receiptNumber",
  proof_image AS "proofImage",
  notes,
  paid_at AS "paidAt",
  completed_at AS "completedAt",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

const orderSelectWithAlias = `
  o.id,
  o.user_id AS "userId",
  o.product_id AS "productId",
  o.product_name AS "productName",
  o.nominal,
  o.price,
  o.discount,
  o.final_price AS "finalPrice",
  o.game,
  o.game_username AS "gameUsername",
  o.game_user_id AS "gameUserId",
  o.payment_method AS "paymentMethod",
  o.payment_status AS "paymentStatus",
  o.order_status AS "orderStatus",
  o.receipt_number AS "receiptNumber",
  o.proof_image AS "proofImage",
  o.notes,
  o.paid_at AS "paidAt",
  o.completed_at AS "completedAt",
  o.created_at AS "createdAt",
  o.updated_at AS "updatedAt"
`;

export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    const body = await request.json();

    const now = new Date();
    const receiptNumber =
      body.receiptNumber ||
      `RCPT-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`;

    const result = await query<DbOrder>(
      `
        INSERT INTO orders (
          user_id,
          product_id,
          product_name,
          nominal,
          price,
          discount,
          final_price,
          game,
          game_username,
          game_user_id,
          payment_method,
          payment_status,
          order_status,
          receipt_number,
          proof_image,
          notes,
          paid_at,
          completed_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING ${orderSelect}
      `,
      [
        user.userId,
        body.productId,
        body.productName,
        body.nominal,
        body.price,
        body.discount || 0,
        body.finalPrice,
        body.game,
        body.gameUsername,
        body.gameUserId,
        body.paymentMethod,
        body.paymentStatus || 'confirmed',
        body.orderStatus || 'completed',
        receiptNumber,
        body.proofImage || null,
        body.notes || null,
        body.paidAt || now,
        body.completedAt || now,
      ],
    );

    return NextResponse.json(toOrder(result.rows[0]), { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request);
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');

    if (admin === 'all') {
      await verifyAdmin(user.userId);
      const result = await query<
        DbOrder & Pick<PublicUser, 'email' | 'fullName' | 'nickname'>
      >(`
        SELECT
          ${orderSelectWithAlias},
          u.email,
          u.full_name AS "fullName",
          u.nickname
        FROM orders o
        JOIN users u ON u.id = o.user_id
        ORDER BY o.created_at DESC
      `);

      return NextResponse.json(
        result.rows.map((order) =>
          toOrder(order, {
            email: order.email,
            fullName: order.fullName,
            nickname: order.nickname,
          }),
        ),
      );
    }

    const result = await query<DbOrder>(
      `
        SELECT ${orderSelect}
        FROM orders
        WHERE user_id = $1
        ORDER BY created_at DESC
      `,
      [user.userId],
    );
    return NextResponse.json(result.rows.map((order) => toOrder(order)));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
