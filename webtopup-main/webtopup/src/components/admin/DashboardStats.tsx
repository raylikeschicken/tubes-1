'use client';

import React from 'react';
import styles from './DashboardStats.module.css';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'pink';
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, trend }) => {
  return (
    <div className={`${styles.statCard} ${styles[color]}`}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.value}>{value}</h3>
        {trend && <span className={styles.trend}>{trend}</span>}
      </div>
    </div>
  );
};

interface DashboardStatsProps {
  revenueToday: number;
  revenueMonth: number;
  totalTransactions: number;
  totalUsers: number;
  pendingTransactions: number;
  successTransactions: number;
  failedTransactions: number;
}

export default function DashboardStats({
  revenueToday,
  revenueMonth,
  totalTransactions,
  totalUsers,
  pendingTransactions,
  successTransactions,
  failedTransactions,
}: DashboardStatsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={styles.container}>
      <StatCard 
        icon="💰" 
        label="Pemasukan Hari Ini" 
        value={formatCurrency(revenueToday)} 
        color="blue"
      />
      <StatCard 
        icon="💵" 
        label="Pemasukan Bulan Ini" 
        value={formatCurrency(revenueMonth)} 
        color="green"
      />
      <StatCard 
        icon="📦" 
        label="Jumlah Transaksi" 
        value={totalTransactions} 
        color="orange"
      />
      <StatCard 
        icon="👤" 
        label="Jumlah User" 
        value={totalUsers} 
        color="purple"
      />
      <StatCard 
        icon="⏳" 
        label="Transaksi Pending" 
        value={pendingTransactions} 
        color="pink"
      />
      <StatCard 
        icon="✅" 
        label="Transaksi Berhasil" 
        value={successTransactions} 
        color="green"
      />
      <StatCard 
        icon="❌" 
        label="Transaksi Gagal" 
        value={failedTransactions} 
        color="red"
      />
    </div>
  );
}
