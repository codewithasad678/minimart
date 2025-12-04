📦 MiniMart API

A complete Node.js + Express + MongoDB REST API for a store.
Includes authentication, products, orders, validation, error handling, security, and admin role support.

🚀 Features
🔐 Authentication

Register

Login

JWT Access Token + Refresh Token

Logout

Forgot / Reset Password (via email or console simulation)

🛍 Products

Create product (admin only)

Get all products (pagination + search)

Get single product

Update product (admin only)

Delete product (admin only)

📦 Orders

Create order

Get logged-in user's orders

Admin: Get all orders

🛡 Security & Best Practices

Helmet (security headers)

Rate limiting

CORS

Express-validator

Centralized error handler

Password hashing with bcrypt

JWT role-based access

🧰 Developer Tools

Morgan logging

dotenv for configs

Async handler wrapper

📁 Folder Structure
minimart-api/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── orderController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   ├── asyncHandler.js
│   └── errorMiddleware.js
├── models/
│   ├── userModel.js
│   ├── productModel.js
│   └── orderModel.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
├── utils/
│   ├── paginate.js
│   └── sendEmail.js
├── .env
├── server.js
└── README.md

⚙️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcrypt

express-validator

Nodemailer (optional)

Helmet, CORS, Rate-Limit

Morgan

🔧 Environment Variables

Create .env file:

PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=1h
REFRESH_TOKEN_EXPIRE=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

CLIENT_URL=http://localhost:3000

▶️ Running the Project
Install dependencies:
npm install

Start development:
npm run dev

Start production:
npm start

🔐 Auth Routes
Method	Endpoint	Description
POST	/api/users/register	Register new user
POST	/api/users/login	Login & get token
POST	/api/users/refresh-token	Regenerate access token
POST	/api/users/logout	Clear refresh token
POST	/api/users/forgot-password	Send reset email
PUT	/api/users/reset-password/:token	Reset password
🛍 Product Routes
Method	Endpoint	Description
POST	/api/products	Create product (admin)
GET	/api/products	List products (pagination + search)
GET	/api/products/:id	Get single product
PUT	/api/products/:id	Update (admin)
DELETE	/api/products/:id	Delete (admin)

Search example:

GET /api/products?keyword=shoes&page=1&limit=10

📦 Order Routes
Method	Endpoint	Description
POST	/api/orders	Create order (user)
GET	/api/orders/my-orders	Get logged-in user's orders
GET	/api/orders	Get all orders (admin)
🧩 Extra Features

Pagination Utility

Role-based authorization

Centralized error handler

Email sending simulation

Proper status codes & validation

🧪 Testing Checklist

Register user

Login user

Test protected routes

Create product (admin)

Product pagination + search

Create order

Forgot/Reset password

Refresh token flow

🧩 Future Enhancements

Product image upload (Cloudinary/S3)

Admin dashboard stats

Wishlist system

Seller role

Deployment on Render / Railway