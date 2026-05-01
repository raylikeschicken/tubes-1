import { Pool, type PoolClient, type QueryResultRow } from 'pg';

const globalForPg = globalThis as typeof globalThis & {
  pgPool?: Pool;
};

function createPool() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('Please define POSTGRES_URL or DATABASE_URL for PostgreSQL.');
  }

  return new Pool({
    connectionString,
    ssl:
      process.env.POSTGRES_SSL === 'false'
        ? false
        : {
            rejectUnauthorized: false,
          },
  });
}

function getPool() {
  if (!globalForPg.pgPool) {
    globalForPg.pgPool = createPool();
  }

  return globalForPg.pgPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
) {
  return getPool().query<T>(text, params);
}

export async function withTransaction<T>(callback: (client: PoolClient) => Promise<T>) {
  const client = await getPool().connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export type DbUser = {
  id: string;
  email: string;
  password: string;
  nickname: string | null;
  fullName: string | null;
  phoneNumber: string | null;
  role: 'user' | 'admin';
  balance: string;
  gameAccounts: unknown[];
  createdAt: Date;
  updatedAt: Date;
};

export type PublicUser = Omit<DbUser, 'password'>;

export type DbOrder = {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  nominal: string;
  price: string;
  discount: string;
  finalPrice: string;
  game: string;
  gameUsername: string;
  gameUserId: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'confirmed' | 'failed';
  orderStatus: 'pending' | 'processing' | 'completed' | 'cancelled';
  receiptNumber: string | null;
  proofImage: string | null;
  notes: string | null;
  paidAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

function numeric(value: string | number | null) {
  if (value === null) return value;
  return Number(value);
}

export function toPublicUser(user: PublicUser) {
  return {
    _id: user.id,
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
    role: user.role,
    balance: numeric(user.balance),
    gameAccounts: user.gameAccounts || [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function toOrder(order: DbOrder, user?: Pick<PublicUser, 'email' | 'fullName' | 'nickname'> | null) {
  return {
    _id: order.id,
    id: order.id,
    userId: user
      ? {
          email: user.email,
          fullName: user.fullName,
          nickname: user.nickname,
        }
      : order.userId,
    productId: order.productId,
    productName: order.productName,
    nominal: numeric(order.nominal),
    price: numeric(order.price),
    discount: numeric(order.discount),
    finalPrice: numeric(order.finalPrice),
    game: order.game,
    gameUsername: order.gameUsername,
    gameUserId: order.gameUserId,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
    receiptNumber: order.receiptNumber,
    proofImage: order.proofImage,
    notes: order.notes,
    paidAt: order.paidAt,
    completedAt: order.completedAt,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}
