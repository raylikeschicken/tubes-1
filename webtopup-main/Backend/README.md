# Web Top Up Backend

Backend API untuk aplikasi top up game, dibangun dengan Node.js, Express, dan MongoDB.

## Features

- User authentication (register/login)
- Top up product management
- Order processing
- JWT authentication

## Installation

1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables in `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://user:password@cluster.example.mongodb.net/webtopup
   JWT_SECRET=your_jwt_secret_here
   CORS_ORIGIN=https://your-frontend-domain.com
   ```

4. Start the server:
   ```
   npm start
   ```

   For development:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all top up products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create new order (requires auth)
- `GET /api/orders` - Get user orders (requires auth)
- `GET /api/orders/admin/all` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
