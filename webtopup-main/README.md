# 💎 Web Top Up - Platform Gaming Top Up Terlengkap

> Platform top up game terlengkap dengan dukungan MLBB, PUBG, Free Fire, COD Mobile, Arena of Valor, dan game lainnya. Proses cepat, harga kompetitif, dan garansi kepuasan 100%.

## ✨ Fitur Utama

### 🎮 Multi-Game Support
- **Mobile Legends: Bang Bang (MLBB)** - Diamond, Battle Pass
- **PUBG Mobile** - UC (Unknown Cash)
- **Free Fire** - Diamond, Voucher
- **Call of Duty Mobile** - CP (COD Points)
- **Arena of Valor** - Voucher

### 💰 Berbagai Kategori Produk
- **Diamond** - In-game currency premium
- **Gold/Voucher** - Alternative currency
- **Battle Pass** - Premium access
- **Seasonal Items** - Limited editions

### 💳 Multiple Payment Methods
- Transfer Bank (BCA, BRI, BNI, Mandiri)
- GoPay
- OVO
- DANA
- LinkAja

### 📊 Features
- ✅ Real-time order tracking
- ✅ Instant top up delivery (menit)
- ✅ 24/7 customer support
- ✅ Secure transactions
- ✅ 100% money back guarantee
- ✅ Admin dashboard
- ✅ User account management
- ✅ Payment verification system

## 🏗️ Teknologi Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, CORS

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State**: React Hooks
- **HTTP**: Fetch API

### DevTools
- **Package Manager**: npm
- **Development**: Nodemon (Backend), Hot Reload (Frontend)
- **Database**: MongoDB (Local or Atlas)

## 📁 Project Structure

```
Web-TopUp_Game-main/
├── Backend/
│   ├── models/
│   │   ├── User.js              # User model with balance & game accounts
│   │   ├── TopUpProduct.js      # Top up product model
│   │   └── Order.js             # Top up order model
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── services.js          # Products endpoints (GET, POST, PUT, DELETE)
│   │   ├── orders.js            # Orders endpoints
│   │   └── users.js             # User endpoints
│   ├── server.js                # Express app configuration
│   ├── seed.js                  # Database seed script
│   ├── package.json
│   └── .env.example
│
├── frontend app/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # Home page
│   │   │   └── layout.tsx       # Root layout
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── sections/
│   │   │       ├── HeroSection.tsx
│   │   │       ├── HowItWorks.tsx
│   │   │       ├── TopUpSection.tsx (Products)
│   │   │       ├── TestimonialsSection.tsx
│   │   │       └── FaqSection.tsx
│   │   ├── data/
│   │   │   └── dummyData.ts     # Products, testimonials, FAQ
│   │   └── types/
│   │       └── index.ts         # TypeScript types & interfaces
│   ├── package.json
│   └── tsconfig.json
│
├── TRANSFORMASI_TOPUP.md        # Transformation documentation
├── DEPLOYMENT_GUIDE.md          # Complete deployment guide
├── api-test.sh                  # API testing script
└── README.md (this file)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ & npm
- MongoDB 5+ (local atau Atlas)
- Git

### 1. Clone Repository
```bash
git clone <repo-url>
cd Web-TopUp_Game-main
```

### 2. Backend Setup
```bash
cd Backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan MongoDB URI dan JWT secret

# Populate database
npm run seed

# Start server
npm run dev
# Backend akan berjalan di http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../<frontend-folder>

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend akan berjalan di http://localhost:3000
```

### 4. Test API
```bash
# Buka terminal baru, jalankan test script
bash ../api-test.sh
```

## 📚 API Documentation

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user1@example.com",
  "password": "user1234"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "user1@example.com",
    "fullName": "Gamer One",
    "role": "user"
  }
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "securepassword123",
  "fullName": "New User"
}
```

### Products

#### Get All Products
```http
GET /api/products
GET /api/products?game=mlbb
GET /api/products?category=diamond
GET /api/products?game=mlbb&category=diamond

Response: Array of TopUpProduct[]
```

#### Get Single Product
```http
GET /api/products/:id

Response: TopUpProduct
```

#### Create Product (Admin)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "100 Diamond",
  "nominal": 100,
  "price": 10000,
  "description": "...",
  "icon": "💎",
  "game": "mlbb",
  "category": "diamond",
  "isPopular": false,
  "discount": 0,
  "status": "active"
}
```

### Orders

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "mlbb-diamond-3",
  "productName": "70 Diamond",
  "nominal": 70,
  "price": 15000,
  "discount": 750,
  "finalPrice": 14250,
  "game": "mlbb",
  "gameUsername": "PlayerName",
  "gameUserId": "12345678",
  "paymentMethod": "gopay",
  "notes": "Optional notes"
}

Response:
{
  "id": "...",
  "userId": "...",
  "orderStatus": "pending",
  "paymentStatus": "pending",
  "createdAt": "2026-04-25T10:30:00Z"
}
```

#### Get User Orders
```http
GET /api/orders
Authorization: Bearer <token>

Response: Array of TopUpOrder[]
```

#### Confirm Payment
```http
PUT /api/orders/:id/confirm-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "proofImage": "base64-image-or-url"
}
```

#### Update Order Status (Admin)
```http
PUT /api/orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentStatus": "confirmed",
  "orderStatus": "processing"
}
```

## 🧪 Testing

### Manual API Testing
```bash
# Test dengan curl
curl http://localhost:5000/api/products | jq

# Test dengan Postman
# Import collection dari documentation
```

### Automated Testing
```bash
# Run test script
bash api-test.sh

# Output akan show successful tests dengan green checkmarks
```

## 📦 Database Models

### User Schema
```typescript
{
  email: String (unique),
  password: String (hashed),
  fullName: String,
  phoneNumber: String,
  role: String ('user' | 'admin'),
  balance: Number (default: 0),
  gameAccounts: [
    {
      game: String,
      username: String,
      userId: String,
      serverId: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### TopUpProduct Schema
```typescript
{
  name: String,
  nominal: Number,
  price: Number,
  description: String,
  icon: String,
  game: String,
  category: String,
  isPopular: Boolean,
  discount: Number (percentage),
  status: String ('active' | 'inactive'),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```typescript
{
  userId: ObjectId (ref: User),
  productId: ObjectId (ref: TopUpProduct),
  productName: String,
  nominal: Number,
  price: Number,
  discount: Number,
  finalPrice: Number,
  game: String,
  gameUsername: String,
  gameUserId: String,
  paymentMethod: String,
  paymentStatus: String ('pending' | 'confirmed' | 'failed'),
  orderStatus: String ('pending' | 'processing' | 'completed' | 'cancelled'),
  proofImage: String (URL),
  notes: String,
  completedAt: Date,
  createdAt: Date
}
```

## 🔐 Authentication & Security

### JWT Token Format
- **Header**: `Authorization: Bearer <token>`
- **Token Type**: JWT
- **Expiry**: Configurable (default: 24 hours)

### Password Security
- Hashed dengan bcryptjs (10 salt rounds)
- Minimum 8 characters recommended
- HTTPS required for production

### API Security
- CORS enabled untuk trusted origins
- Rate limiting (recommended untuk production)
- Input validation
- SQL injection protection
- XSS protection

## 📱 Sample Data

### Test Accounts
```
Admin:
Email: admin@example.com
Password: admin123

User 1:
Email: user1@example.com
Password: user1234
Balance: Rp 100.000

User 2:
Email: user2@example.com
Password: topup1234
Balance: Rp 250.000
```

### Sample Products
- MLBB: 70 Diamond (Rp 15.000)
- MLBB: 140 Diamond (Rp 28.000)
- PUBG: 300 UC (Rp 38.000)
- Free Fire: 100 Diamond (Rp 9.500)
- COD Mobile: 500 CP (Rp 25.000)

## 🌐 Deployment

### Recommended Services
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Render, AWS EC2
- **Database**: MongoDB Atlas, AWS DocumentDB
- **CDN**: CloudFlare, AWS CloudFront

### See DEPLOYMENT_GUIDE.md for detailed instructions

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill existing process
kill -9 <PID>

# Check MongoDB
mongosh
```

### CORS errors
- Add frontend URL to CORS whitelist di server.js
- Check browser console untuk actual error message

### API returns 401 Unauthorized
- Check if token is valid
- Login again untuk get fresh token
- Ensure Authorization header is set correctly

## 📞 Support

Untuk bantuan:
1. Check error messages di console
2. Lihat API response dalam Postman/Browser
3. Review MongoDB logs
4. Check Network tab di browser DevTools

## 📝 License

MIT License - Free for educational & commercial use

## ✅ Checklist untuk Submission

- [ ] Backend running & accessible
- [ ] Frontend running & accessible
- [ ] Database seeded dengan sample data
- [ ] API endpoints tested & working
- [ ] Authentication working (login/register)
- [ ] CORS configured correctly
- [ ] All models working as expected
- [ ] Routes tested & responsive
- [ ] Sample orders dapat dibuat
- [ ] Testimonials & FAQ terlihat
- [ ] Responsive design working
- [ ] No console errors
- [ ] Documentation lengkap

## 🎯 Next Steps

Untuk enhancement di masa depan:
1. [ ] Payment gateway integration (Midtrans, Xendit)
2. [ ] Admin dashboard
3. [ ] Email notifications
4. [ ] SMS alerts
5. [ ] Analytics & reporting
6. [ ] Mobile app (React Native)
7. [ ] Advanced search & filtering
8. [ ] Wishlist & favorites
9. [ ] Referral system
10. [ ] Loyalty program

## 🚀 Ready to Launch!

Website sudah siap untuk di-host dan digunakan. Semua fitur dasar top up sudah implemented dan dapat langsung digunakan.

**Happy coding! 💻🎮**

---

*Last Updated: May 1, 2026*
*Version: 1.0.0*
#   w e b t o p u p  
 #   w e b t o p u p  
 