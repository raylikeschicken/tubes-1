import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { query, toOrder, type DbOrder } from '@/lib/db';

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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(request);
    const result = await query<DbOrder>(`SELECT ${orderSelect} FROM orders WHERE id = $1`, [params.id]);
    const order = result.rows[0];

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.userId !== user.userId && user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json(toOrder(order));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(request);
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || (request.url.endsWith('/status') ? 'status' : null);

    if (action === 'status') {
      await verifyAdmin(user.userId);
      const { paymentStatus, orderStatus } = body;
      const result = await query<DbOrder>(
        `
          UPDATE orders
          SET
            payment_status = COALESCE($1::payment_status, payment_status),
            order_status = COALESCE($2::order_status, order_status),
            completed_at = CASE
              WHEN $2 = 'completed' THEN NOW()
              ELSE completed_at
            END
          WHERE id = $3
          RETURNING ${orderSelect}
        `,
        [paymentStatus, orderStatus, params.id],
      );
      const order = result.rows[0];

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(toOrder(order));
    }

    if (action === 'confirm-payment') {
      const { proofImage } = body;
      const result = await query<DbOrder>(
        `
          UPDATE orders
          SET payment_status = 'pending', proof_image = $1
          WHERE id = $2 AND user_id = $3
          RETURNING ${orderSelect}
        `,
        [proofImage, params.id, user.userId],
      );
      const order = result.rows[0];

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(toOrder(order));
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(request);
    await verifyAdmin(user.userId);

    const result = await query('DELETE FROM orders WHERE id = $1 RETURNING id', [params.id]);
    if (!result.rowCount) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
