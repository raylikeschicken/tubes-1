# Vercel Deployment Guide

## Prerequisites

1. **MongoDB Database**: You need a MongoDB database. You can use:
   - MongoDB Atlas (cloud): https://www.mongodb.com/atlas
   - Or any other MongoDB hosting service

2. **Vercel Account**: Sign up at https://vercel.com

## Environment Variables Setup

### 1. In Vercel Dashboard
After connecting your repository, go to your project settings and add these environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/webtopup
JWT_SECRET=your_super_secure_jwt_secret_here_make_it_long_and_random
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
```

### 2. Local Development
Your `.env.local` file should look like this:
```
MONGODB_URI=mongodb://localhost:27017/webtopup
JWT_SECRET=your_jwt_secret_here_change_this_in_production
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
```

## Deployment Steps

### 1. Connect Repository to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `webtopup` (if your repo structure has the Next.js app in a subfolder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 2. Set Environment Variables
In your Vercel project settings, add the environment variables listed above.

### 3. Deploy
Click "Deploy" and wait for the build to complete.

## Database Setup

### Option 1: MongoDB Atlas (Recommended)
1. Create account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create database user
4. Get connection string
5. Add IP address 0.0.0.0/0 to whitelist (for Vercel)

### Option 2: Other MongoDB Services
- Railway
- PlanetScale (with MongoDB compatibility)
- DigitalOcean Managed MongoDB

## Post-Deployment

1. **Seed Database**: After deployment, you might want to seed initial data
2. **Test Authentication**: Try registering and logging in
3. **Check Admin Access**: Use `admin@example.com` to create admin account

## Troubleshooting

### Build Errors
- Check that all dependencies are installed
- Verify TypeScript types are correct
- Check Vercel function logs

### Database Connection Issues
- Verify MONGODB_URI is correct
- Check IP whitelisting in MongoDB Atlas
- Ensure database user has proper permissions

### API Route Issues
- Check Vercel function logs
- Verify environment variables are set
- Test API routes locally first

## File Structure
```
webtopup/
├── src/
│   ├── app/
│   │   ├── api/           # API routes (auth, orders, etc.)
│   │   ├── (auth)/        # Authentication pages
│   │   └── admin/         # Admin dashboard
│   └── lib/
│       ├── mongodb.ts     # Database connection
│       └── models/        # Mongoose models
├── vercel.json            # Vercel configuration
└── .env.local             # Local environment variables
```