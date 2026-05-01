# 🚀 Panduan Deployment Web Top Up

## Persiapan Lokal

### 1. Clone Repository
```bash
git clone <repo-url>
cd Web-TopUp_Game-main
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd Backend
npm install
```

#### Konfigurasi Environment
```bash
cp .env.example .env
# Edit .env dengan konfigurasi Anda
# - MONGODB_URI: Connection string ke MongoDB
# - JWT_SECRET: Secret key untuk JWT (buat yang kuat!)
# - PORT: Port backend (default: 5000)
```

#### Setup Database
```bash
# Run seed untuk populate database dengan sample data
npm run seed

# Output akan menampilkan:
# admin@example.com / admin123
# user1@example.com / user1234
# user2@example.com / topup1234
```

#### Jalankan Backend
```bash
npm run dev
# Server akan berjalan di http://localhost:5000
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../<frontend-folder>
npm install
```

#### Development
```bash
npm run dev
# Frontend akan berjalan di http://localhost:3000
```

#### Build untuk Production
```bash
npm run build
npm start
```

## Deployment ke Server

### Option 1: Vercel (Frontend Termudah)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd <frontend-folder>
vercel
```

### Option 2: Heroku (Backend)

```bash
# Install Heroku CLI
npm i -g heroku

# Login ke Heroku
heroku login

# Create app
heroku create web-topup-backend

# Set environment variables
heroku config:set MONGODB_URI="mongodb+srv://..."
heroku config:set JWT_SECRET="your-secret-key"

# Deploy
git push heroku main
```

### Option 3: VPS/Cloud (Lengkap)

#### Setup Server (Ubuntu/Debian)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install MongoDB
sudo apt install mongodb -y
sudo systemctl start mongodb

# Install PM2 untuk manage processes
sudo npm install -g pm2

# Clone repo
git clone <repo-url>
cd Web-TopUp_Game-main
```

#### Deploy Backend dengan PM2

```bash
cd Backend
npm install

# Create .env file
cp .env.example .env
# Edit .env dengan settings yang sesuai

# Run seed
npm run seed

# Start dengan PM2
pm2 start "npm run dev" --name "topup-backend"
pm2 save
pm2 startup

# Monitor
pm2 logs topup-backend
```

#### Deploy Frontend

```bash
cd ../<frontend-folder>
npm install
npm run build

# Install serve untuk static hosting
sudo npm install -g serve

# Run dengan PM2
pm2 start "serve -s out -l 3000" --name "topup-frontend"
pm2 save
```

#### Setup Nginx Reverse Proxy

```bash
sudo apt install nginx -y

# Edit config
sudo nano /etc/nginx/sites-available/default
```

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# Validate config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

#### Setup SSL dengan Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y

# Generate certificate
sudo certbot --nginx -d your-domain.com

# Auto renewal
sudo systemctl enable certbot.timer
```

## Checklist Pre-Launch

- [ ] Database sudah ter-setup dan terkoneksi
- [ ] Environment variables sudah dikonfigurasi
- [ ] Seed data sudah dijalankan
- [ ] Backend berjalan dan accessible
- [ ] Frontend berjalan dan accessible
- [ ] API endpoints sudah tested
- [ ] CORS sudah dikonfigurasi dengan benar
- [ ] SSL/HTTPS sudah setup (untuk production)
- [ ] Backup database sudah dijadwalkan
- [ ] Monitoring sudah setup
- [ ] Domain sudah pointing ke server

## Testing

### Test Backend

```bash
# Test API dengan curl
curl http://localhost:5000/

# Get products
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user1@example.com",
    "password": "user1234"
  }'
```

### Test Frontend

```bash
# Build dan test production build
cd <frontend-folder>
npm run build
npm start
# Buka http://localhost:3000
```

## Troubleshooting

### MongoDB Connection Error
```
Solusi: 
1. Pastikan MongoDB sudah running: sudo systemctl status mongodb
2. Check connection string di .env
3. Pastikan firewall tidak memblok port 27017
```

### CORS Error
```
Solusi:
1. Check konfigurasi CORS di server.js
2. Pastikan frontend dan backend URL sesuai
3. Add 'Access-Control-Allow-Origin' header
```

### Port Already in Use
```bash
# Cari process yang menggunakan port
lsof -i :5000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Seed Fails
```bash
# Debug seed
node seed.js

# Check MongoDB connection
mongosh
```

## Performance Tips

1. **Enable Compression**
   ```javascript
   app.use(compression());
   ```

2. **Add Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   app.use(limiter);
   ```

3. **Database Indexing**
   ```javascript
   userSchema.index({ email: 1 });
   orderSchema.index({ userId: 1 });
   ```

4. **Caching dengan Redis** (Optional)

5. **CDN untuk Static Assets**

## Monitoring

### PM2 Monitoring
```bash
pm2 web
# Akses: http://localhost:9615
```

### Log Rotation
```bash
pm2 install pm2-auto-pull
```

## Support

Jika ada masalah, check:
1. Console output: `pm2 logs topup-backend`
2. MongoDB logs
3. Nginx error log: `/var/log/nginx/error.log`
4. Frontend browser console

Good luck dengan deployment! 🚀
