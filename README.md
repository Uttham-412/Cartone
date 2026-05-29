# CART One 🛒

CART One is a modern full-stack ecommerce shopping cart application built using React.js, Node.js, Express.js, and MongoDB.

The application provides a clean and responsive shopping experience with secure authentication, cart management, checkout flow, product search, sorting functionality, and persistent database storage.

---

# 🚀 Features

✅ User Authentication

✅ JWT Authorization

✅ MongoDB Database Integration

✅ Product Listing

✅ Add to Cart

✅ Remove from Cart

✅ Quantity Management

✅ Checkout Page

✅ Product Search

✅ Product Sorting

✅ Real-time Cart Notification Badge

✅ Responsive UI

✅ Protected Routes

✅ Professional Error Handling

✅ Modern Ecommerce Design

---

# 🛍️ Application Preview

## 🏠 Home Page

<img width="100%" alt="Home Page" src="./screenshots/home-page.png">

### Features

* Product listing
* Product search
* Product sorting
* Responsive product grid
* Modern ecommerce UI

---

## 🛒 Shopping Cart

<img width="100%" alt="Cart Page" src="./screenshots/cart-page.png">

### Features

* Quantity update
* Remove products
* Dynamic total calculation
* Persistent cart storage
* Checkout integration

---

## 💳 Checkout Page

<img width="100%" alt="Checkout Page" src="./screenshots/checkout-page.png">

### Features

* Billing form
* Order summary
* Place order functionality

---

## 📝 Register Page

<img width="100%" alt="Register Page" src="./screenshots/register-page.png">

---

## 🔑 Login Page

<img width="100%" alt="Login Page" src="./screenshots/login-page.png">

---

# ✨ Key Highlights

* Full-stack ecommerce workflow
* JWT-based authentication
* MongoDB database integration
* Persistent user and cart storage
* Modern React frontend
* REST API integration
* Responsive design
* Professional UI/UX
* Realtime cart updates
* Search and sorting functionality
* Clean component architecture

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Context API
* CSS Inline Styling

---

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

---

## Database

* MongoDB
* Mongoose

---

# 📁 Project Structure

```bash
cart-one/
│
├── frontend/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seedProducts.js
│   └── server.js
│
├── screenshots/
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Uttham-412/Cartone.git
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 3️⃣ MongoDB Setup

Make sure MongoDB is running locally.

Create a `.env` file inside the backend folder:

```env
PORT=5000
JWT_SECRET=your_secret_key
MONGODB_URI=mongodb://127.0.0.1:27017/cartone
```

---

## 4️⃣ Seed Products

```bash
node seedProducts.js
```

This will populate the database with sample products.

---

## 5️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 📦 API Endpoints

## Authentication APIs

| Method | Endpoint  | Description       |
| ------ | --------- | ----------------- |
| POST   | /register | Register new user |
| POST   | /login    | Login user        |

---

## Product APIs

| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| GET    | /products | Fetch all products |

---

## Cart APIs

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| GET    | /cart                   | Get user cart            |
| POST   | /cart/add               | Add product to cart      |
| PATCH  | /cart/update            | Update cart quantity     |
| DELETE | /cart/remove/:productId | Remove product from cart |

---

# 🎯 Additional Improvements

* MongoDB persistence replacing mock data
* CART One branding and logo
* Modern ecommerce hero section
* Dynamic cart notification badge
* Active navigation highlighting
* Responsive product cards
* Session expiry handling
* Professional alerts and validations
* Real-time UI updates
* Protected routes using JWT authentication

---

# 👨‍💻 Author

## Uttham

Focused on building clean, responsive, and modern full-stack web applications with intuitive user experiences.
