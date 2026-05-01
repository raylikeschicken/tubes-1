const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const User = require('./models/User');
const TopUpProduct = require('./models/TopUpProduct');
const Order = require('./models/Order');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webtopup';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await Order.deleteMany({});
    await TopUpProduct.deleteMany({});
    await User.deleteMany({});

    const adminPassword = await bcrypt.hash('admin123', 10);
    const user1Password = await bcrypt.hash('user1234', 10);
    const user2Password = await bcrypt.hash('topup1234', 10);

    const adminUser = await User.create({
      email: 'admin@example.com',
      password: adminPassword,
      fullName: 'Admin TopUp',
      role: 'admin',
      balance: 0,
    });

    const userOne = await User.create({
      email: 'user1@example.com',
      password: user1Password,
      fullName: 'Gamer One',
      phoneNumber: '081234567890',
      role: 'user',
      balance: 100000,
      gameAccounts: [
        {
          game: 'mlbb',
          username: 'GamerOne',
          userId: 'GAMERONE123',
          serverId: 'IDN1',
        }
      ]
    });

    const userTwo = await User.create({
      email: 'user2@example.com',
      password: user2Password,
      fullName: 'Top Up Master',
      phoneNumber: '081987654321',
      role: 'user',
      balance: 250000,
      gameAccounts: [
        {
          game: 'pubg',
          username: 'ProShooter',
          userId: 'PROSHOOTER456',
          serverId: 'ASIA',
        },
        {
          game: 'freefire',
          username: 'FFPro',
          userId: 'FFPRO789',
          serverId: 'GLOBAL',
        }
      ]
    });

    const products = await TopUpProduct.insertMany([
      // MLBB Diamond
      {
        name: '70 Diamond',
        nominal: 70,
        price: 15000,
        description: 'Paket diamond populer',
        icon: '💎',
        game: 'mlbb',
        category: 'diamond',
        isPopular: true,
        discount: 5,
        status: 'active',
      },
      {
        name: '140 Diamond',
        nominal: 140,
        price: 28000,
        description: 'Paket hemat lebih banyak',
        icon: '💎',
        game: 'mlbb',
        category: 'diamond',
        isPopular: true,
        discount: 5,
        status: 'active',
      },
      {
        name: '570 Diamond',
        nominal: 570,
        price: 108000,
        description: 'Paket XL hemat maksimal',
        icon: '💎',
        game: 'mlbb',
        category: 'diamond',
        isPopular: false,
        discount: 10,
        status: 'active',
      },
      // PUBG UC
      {
        name: '300 UC',
        nominal: 300,
        price: 38000,
        description: 'Paket UC standar',
        icon: '🎮',
        game: 'pubg',
        category: 'voucher',
        isPopular: true,
        discount: 5,
        status: 'active',
      },
      // Free Fire Diamond
      {
        name: '100 Diamond',
        nominal: 100,
        price: 9500,
        description: 'Paket diamond standar',
        icon: '💎',
        game: 'freefire',
        category: 'diamond',
        isPopular: true,
        discount: 5,
        status: 'active',
      },
      // COD Mobile CP
      {
        name: '500 CP',
        nominal: 500,
        price: 25000,
        description: 'COD Points untuk Call of Duty Mobile',
        icon: '🎯',
        game: 'codm',
        category: 'voucher',
        isPopular: true,
        discount: 0,
        status: 'active',
      },
    ]);

    const orders = await Order.insertMany([
      {
        userId: userOne._id,
        productId: products[0]._id,
        productName: '70 Diamond',
        nominal: 70,
        price: 15000,
        discount: 750,
        finalPrice: 14250,
        game: 'mlbb',
        gameUsername: 'GamerOne',
        gameUserId: 'GAMERONE123',
        paymentMethod: 'gopay',
        paymentStatus: 'confirmed',
        orderStatus: 'completed',
        completedAt: new Date(),
      },
      {
        userId: userTwo._id,
        productId: products[3]._id,
        productName: '300 UC',
        nominal: 300,
        price: 38000,
        discount: 1900,
        finalPrice: 36100,
        game: 'pubg',
        gameUsername: 'ProShooter',
        gameUserId: 'PROSHOOTER456',
        paymentMethod: 'dana',
        paymentStatus: 'pending',
        orderStatus: 'processing',
      },
      {
        userId: userOne._id,
        productId: products[1]._id,
        productName: '140 Diamond',
        nominal: 140,
        price: 28000,
        discount: 1400,
        finalPrice: 26600,
        game: 'mlbb',
        gameUsername: 'GamerOne',
        gameUserId: 'GAMERONE123',
        paymentMethod: 'bank_transfer',
        paymentStatus: 'pending',
        orderStatus: 'pending',
      },
    ]);

    console.log('✅ Top Up System Seed Complete!');
    console.log('\n📊 Data Summary:');
    console.log(`  - Admin User: admin@example.com (Password: admin123)`);
    console.log(`  - User 1: user1@example.com (Password: user1234)`);
    console.log(`  - User 2: user2@example.com (Password: topup1234)`);
    console.log(`  - Products Created: ${products.length}`);
    console.log(`  - Orders Created: ${orders.length}`);
    console.log('\n🚀 Ready to rock!');
  } catch (error) {
    console.error('❌ Seed error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
