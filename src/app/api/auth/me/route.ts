import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { query, toPublicUser, type PublicUser } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Access denied' }, { status: 401 });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    const result = await query<PublicUser>(
      `
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
        WHERE id = $1
      `,
      [verified.userId],
    );
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(toPublicUser(user));
  } catch (error: any) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }
}
