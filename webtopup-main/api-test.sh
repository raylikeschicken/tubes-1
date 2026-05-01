#!/bin/bash

# 🧪 API Testing Script untuk Web Top Up
# Jalankan: bash api-test.sh

BASE_URL="http://localhost:5000/api"
TOKEN=""
USER_ID=""

echo "🚀 Starting Web Top Up API Tests..."
echo "Base URL: $BASE_URL"
echo ""

# ================================
# 1. AUTH TESTS
# ================================
echo "📌 1. Authentication Tests"
echo "=========================="

# Login as user
echo ""
echo "→ Login as user1@example.com..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user1@example.com",
    "password": "user1234"
  }')

echo $LOGIN_RESPONSE | jq .
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
USER_ID=$(echo $LOGIN_RESPONSE | jq -r '.user.id')

if [ -z "$TOKEN" ] || [ "$TOKEN" == "null" ]; then
  echo "❌ Login failed!"
  exit 1
fi

echo "✅ Login successful!"
echo "Token: $TOKEN"
echo "User ID: $USER_ID"

# ================================
# 2. PRODUCT TESTS
# ================================
echo ""
echo "📌 2. Product Tests"
echo "===================="

# Get all products
echo ""
echo "→ Get all products..."
curl -s "$BASE_URL/products" | jq .

# Get MLBB products only
echo ""
echo "→ Get MLBB products only..."
curl -s "$BASE_URL/products?game=mlbb" | jq .

# Get products by category
echo ""
echo "→ Get diamond products..."
curl -s "$BASE_URL/products?category=diamond" | jq .

# ================================
# 3. ORDER TESTS
# ================================
echo ""
echo "📌 3. Order Tests"
echo "================="

# Create order
echo ""
echo "→ Create new top up order..."
CREATE_ORDER=$(curl -s -X POST "$BASE_URL/orders" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "productId": "mlbb-diamond-3",
    "productName": "70 Diamond",
    "nominal": 70,
    "price": 15000,
    "discount": 750,
    "finalPrice": 14250,
    "game": "mlbb",
    "gameUsername": "GamerOne",
    "gameUserId": "GAMERONE123",
    "paymentMethod": "gopay",
    "notes": "Testing order"
  }')

echo $CREATE_ORDER | jq .
ORDER_ID=$(echo $CREATE_ORDER | jq -r '.order._id // .order.id // ._id // .id')

if [ -z "$ORDER_ID" ] || [ "$ORDER_ID" == "null" ]; then
  echo "❌ Order creation might have issues"
  echo "Full response: $CREATE_ORDER"
else
  echo "✅ Order created with ID: $ORDER_ID"
  
  # Get user orders
  echo ""
  echo "→ Get user orders..."
  curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/orders" | jq .
  
  # Get order details
  echo ""
  echo "→ Get order details..."
  curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/orders/$ORDER_ID" | jq .
fi

# ================================
# 4. USER TESTS
# ================================
echo ""
echo "📌 4. User Tests"
echo "================"

# Get user profile
echo ""
echo "→ Get user profile..."
curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/users/profile" | jq .

# ================================
# 5. ERROR TESTS
# ================================
echo ""
echo "📌 5. Error Handling Tests"
echo "=========================="

# Test invalid token
echo ""
echo "→ Test with invalid token..."
curl -s -H "Authorization: Bearer INVALID_TOKEN" "$BASE_URL/orders" | jq .

# Test missing product
echo ""
echo "→ Test get non-existent product..."
curl -s "$BASE_URL/products/invalid-id" | jq .

# ================================
# SUMMARY
# ================================
echo ""
echo "✅ API Tests Complete!"
echo ""
echo "Summary:"
echo "- Base URL: $BASE_URL"
echo "- User: user1@example.com"
echo "- Token obtained: $(echo $TOKEN | cut -c1-20)..."
echo "- User ID: $USER_ID"
echo ""
echo "💡 Tips:"
echo "1. Make sure backend is running on port 5000"
echo "2. MongoDB must be connected"
echo "3. Seed data must be populated"
echo ""
