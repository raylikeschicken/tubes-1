'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiUrl, hasApiUrl } from '@/lib/api';
import DashboardStats from '@/components/admin/DashboardStats';
import styles from './AdminDashboard.module.css';

interface Order {
  _id: string;
  productName: string;
  game: string;
  gameUsername: string;
  gameUserId: string;
  finalPrice: number;
  paymentStatus: string;
  orderStatus: string;
  receiptNumber?: string;
  createdAt: string;
  paidAt?: string;
  userId?: { email?: string; fullName?: string; nickname?: string };
}

interface User {
  _id: string;
  email: string;
  nickname: string;
  role: string;
  createdAt: string;
}

interface DashboardStatsData {
  totalUsers: number;
  totalAdmins: number;
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStatsData | null>(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetch(apiUrl('/api/auth/me'), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Akses admin dibutuhkan');
        return res.json();
      })
      .then((data) => {
        if (data.role !== 'admin') throw new Error('Akses admin dibutuhkan');
        setIsAdmin(true);
        fetchData();
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setTimeout(() => router.push('/'), 3000);
      });
  }, [router]);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [statsResponse, ordersResponse, usersResponse] = await Promise.all([
        fetch(apiUrl('/api/users?action=stats'), { headers }),
        fetch(apiUrl('/api/orders?admin=all'), { headers }),
        fetch(apiUrl('/api/users'), { headers }),
      ]);

      if (statsResponse.ok) setStats(await statsResponse.json());
      if (ordersResponse.ok) setOrders(await ordersResponse.json());
      if (usersResponse.ok) setUsers(await usersResponse.json());
    } catch (err) {
      setError('Gagal memuat data dashboard');
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, orderStatus: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(apiUrl(`/api/orders/${id}?action=status`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderStatus }),
    });

    if (response.ok) fetchData();
    else setError('Gagal update status order');
  };

  const updateUserRole = async (userId: string, role: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(apiUrl(`/api/users/${userId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    if (response.ok) fetchData();
    else setError('Gagal update role user');
  };

  const deleteOrder = async (id: string) => {
    if (!confirm('Hapus order ini?')) return;
    const token = localStorage.getItem('token');
    const response = await fetch(apiUrl(`/api/orders/${id}`), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) fetchData();
    else setError('Gagal menghapus order');
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Hapus user ini?')) return;
    const token = localStorage.getItem('token');
    const response = await fetch(apiUrl(`/api/users/${id}`), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) fetchData();
    else setError('Gagal menghapus user');
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending': return styles.status + ' ' + styles.pending;
      case 'processing': return styles.status + ' ' + styles.processing;
      case 'completed': return styles.status + ' ' + styles.completed;
      case 'cancelled': return styles.status + ' ' + styles.cancelled;
      default: return styles.status;
    }
  };

  const calculateStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    let revenueToday = 0;
    let revenueMonth = 0;
    let successCount = 0;
    let failCount = 0;
    let pendingCount = 0;

    orders.forEach((order) => {
      const orderDate = new Date(order.paidAt || order.createdAt);
      orderDate.setHours(0, 0, 0, 0);

      if (order.orderStatus === 'completed') {
        if (orderDate.getTime() === today.getTime()) {
          revenueToday += order.finalPrice;
        }
        if (orderDate >= thisMonthStart) {
          revenueMonth += order.finalPrice;
        }
        successCount++;
      } else if (order.orderStatus === 'cancelled') {
        failCount++;
      } else if (order.orderStatus === 'pending') {
        pendingCount++;
      }
    });

    return {
      revenueToday,
      revenueMonth,
      successCount,
      failCount,
      pendingCount,
    };
  };

  if (!isAdmin && !error) return <div className={styles.loading}>Checking access...</div>;
  if (error) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <div className={styles.error}>
            <strong>Error:</strong> {error}
            <br />
            Redirecting to home page...
          </div>
        </div>
      </div>
    );
  }
  if (loading) return <div className={styles.loading}>Loading dashboard...</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>🎮 Admin Dashboard</h1>
          <p>Kelola transaksi, pengguna, dan produk top up game</p>
        </div>

        {stats && (
          <DashboardStats
            revenueToday={calculateStats().revenueToday}
            revenueMonth={calculateStats().revenueMonth}
            totalTransactions={orders.length}
            totalUsers={users.length}
            pendingTransactions={calculateStats().pendingCount}
            successTransactions={calculateStats().successCount}
            failedTransactions={calculateStats().failCount}
          />
        )}

        <div className={styles.tabs}>
          <div className={`${styles.tab} ${activeTab === 'orders' ? styles.active : ''}`} onClick={() => setActiveTab('orders')}>Orders</div>
          <div className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`} onClick={() => setActiveTab('users')}>Users</div>
        </div>

        <div className={styles.content}>
          {activeTab === 'orders' && (
            <div>
              <h2>Orders Management ({orders.length})</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Receipt</th>
                    <th>Product</th>
                    <th>Game</th>
                    <th>Game ID</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.userId?.fullName || order.userId?.nickname || order.userId?.email || '-'}</td>
                      <td>{order.receiptNumber || order._id}</td>
                      <td>{order.productName}</td>
                      <td>{order.game}</td>
                      <td>{order.gameUsername || order.gameUserId}</td>
                      <td>{order.paymentStatus}</td>
                      <td><span className={getStatusClass(order.orderStatus)}>{order.orderStatus}</span></td>
                      <td>
                        Rp {order.finalPrice?.toLocaleString('id-ID') || '0'}
                        <br />
                        <small>{new Date(order.paidAt || order.createdAt).toLocaleString('id-ID')}</small>
                      </td>
                      <td>
                        <select className={styles.select} value={order.orderStatus} onChange={(e) => updateOrderStatus(order._id, e.target.value)}>
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button className={`${styles.btn} ${styles.danger}`} onClick={() => deleteOrder(order._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2>Users Management ({users.length})</h2>
              <table className={styles.table}>
                <thead>
                  <tr><th>Email</th><th>Nickname</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.email}</td>
                      <td>{user.nickname}</td>
                      <td>
                        <select className={styles.select} value={user.role} onChange={(e) => updateUserRole(user._id, e.target.value)}>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString('id-ID')}</td>
                      <td><button className={`${styles.btn} ${styles.danger}`} onClick={() => deleteUser(user._id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
