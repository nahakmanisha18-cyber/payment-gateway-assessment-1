# 🛒 E-Commerce Application

A e-commerce web application built with **Next.js App Router**, featuring user authentication, product browsing, cart management, and secure checkout powered by **Razorpay**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764ABC?logo=redux&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451?logo=razorpay&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Upload-3448C5?logo=cloudinary&logoColor=white)
![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey)

---

## 🎬 Demo / Preview

> _Add a live demo link or preview GIF/video here once deployed._

```
🔗 Live Demo: 
```

### 📽️ Project Presentation Video

> _Add a link to your project walkthrough / presentation video here (e.g., YouTube, Loom, Google Drive)._

```
🎥 Presentation Video: 
```

---

## ✨ Features

- 🔐 User registration and login with JWT-based authentication
- 🔒 Secure password hashing using bcryptjs
- 🛍️ Product listing and detailed product pages
- 🛒 Add to cart, update quantity, remove items, and clear cart
- 📦 Checkout page with delivery address form
- 💰 Order price, discount, and delivery charge calculation
- 💳 Razorpay payment integration (order creation & verification)
- ✅ Automatic cart clearing after successful payment
- 🔁 Order success / navigation flow after payment
- ☁️ Product image upload and hosting via Cloudinary
- 📱 Responsive user interface built with Bootstrap & React Bootstrap
- ⏳ Loading states and error handling across the app
- 🛡️ Protected API operations for authenticated users
- 🗄️ MongoDB integration via Mongoose for data persistence
- 🌐 REST-style API routes using Next.js Route Handlers

---

## 🧰 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Bootstrap, React Bootstrap, CSS |
| Icons | Bootstrap Icons, React Icons |
| State Management | Redux Toolkit, React Redux |
| HTTP Client | Axios |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT (jsonwebtoken), bcryptjs |
| Payments | Razorpay |
| Image Upload/Hosting | Cloudinary |
| Runtime | Node.js |

### Key Dependencies (from `package.json`)

```
@reduxjs/toolkit
axios
bcryptjs
bootstrap
bootstrap-icons
cloudinary
jsonwebtoken
mongoose
next
razorpay
react
react-bootstrap
react-dom
react-icons
react-redux
```

---

## 🔄 Application Flow

1. User visits the site and browses products.
2. User signs up or logs in (JWT-based authentication).
3. User views product details and adds items to the cart.
4. Cart state is managed via Redux Toolkit.
5. User proceeds to checkout and fills in a delivery address.
6. Payment is processed through Razorpay.
7. On successful payment verification, the cart is cleared.
8. User is redirected to the appropriate success/cart page.

---

## 🔐 Authentication Flow

Authentication is handled using **JWT (JSON Web Token)** combined with **bcryptjs** for password security.

- **Registration:** When a user signs up, their password is hashed using `bcryptjs` before being stored in MongoDB. Plain-text passwords are never saved.
- **Login:** On login, the submitted password is compared against the hashed password using `bcryptjs`. If valid, a JWT is generated using `jsonwebtoken`.
- **Session Handling:** The JWT is used to identify the user on subsequent requests to protected API routes.
- **Protected Routes:** Backend API routes verify the JWT before allowing access to sensitive operations (e.g., cart updates, payment actions).

> ℹ️ This project does **not** implement OAuth, Google/Facebook login, or server-side sessions. Authentication is strictly JWT + bcryptjs based.

---

## 🛒 Shopping Cart Flow

```
User selects a product
   → Adds product to cart
   → Views cart
   → Updates quantity if needed
   → Removes product(s) if needed
   → Proceeds to checkout
```

Cart state (items, quantities) is managed globally using **Redux Toolkit** and **React Redux**, allowing consistent cart behavior across the app.

---

## 💳 Checkout & Razorpay Payment Flow

The project integrates **Razorpay** as its sole payment gateway. The payment flow works as follows:

1. User enters delivery/checkout details.
2. The frontend sends a request to the backend to create a payment order.
3. The backend creates a corresponding **Razorpay order**.
4. The Razorpay checkout modal opens on the frontend.
5. The user completes the payment through Razorpay's UI.
6. Razorpay returns payment details (order ID, payment ID, signature) to the frontend.
7. The backend verifies the payment signature/details to confirm authenticity.
8. On successful verification, the **cart is cleared**.
9. The user is redirected to the success flow (e.g., order confirmation or cart page).

> ⚠️ Only **Razorpay** is implemented in this project. No other payment gateways (e.g., Stripe, PayPal) are currently supported.

---

## 🖼️ Image Upload Flow (Cloudinary)

Product images are uploaded and hosted using **Cloudinary**, keeping media storage separate from the main database.

1. An image is selected (e.g., during product creation/admin operations).
2. The image is uploaded to **Cloudinary** via the backend upload service.
3. Cloudinary returns a hosted image URL.
4. The returned URL is stored in MongoDB alongside the related product data via Mongoose.
5. The frontend renders product images directly from Cloudinary's hosted URLs.

---

## 🏗️ Project Architecture

- **Frontend & Backend** are unified within a single Next.js application using the **App Router**.
- **API Route Handlers** (inside `src/app/api`) serve as the backend, handling authentication, product, cart, and payment logic.
- **MongoDB** stores application data (users, products, carts), accessed through **Mongoose** models.
- **Cloudinary** handles image uploads and hosting, with resulting URLs stored in MongoDB.
- **Redux Toolkit** manages global client-side state, particularly for authentication and cart data.
- **Axios** is used on the frontend to communicate with the API route handlers.
- **Bootstrap / React Bootstrap** provide the responsive UI layer.

---

## 📁 Folder Structure

> The structure below is a **representative example** based on a typical Next.js App Router project layout. Exact file contents may vary.

```
full-stack-app/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── payment/
│   │   │   ├── product/
│   │   │   └── user/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── checkout/
│   │   ├── details/[id]/
│   │   ├── profile/
│   │   ├── profile-edit/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── LayoutClient.jsx
│   │   ├── page.js
│   │   ├── page.module.css
│   │   └── StoreProvider.js
│   ├── Components/
│   │   ├── AddToCart/
│   │   ├── CheckoutPage/
│   │   ├── Common/
│   │   │   ├── AdminPenal/
│   │   │   │   ├── AdminHeader/
│   │   │   │   ├── AdminProfile/
│   │   │   │   ├── AdminSidebar/
│   │   │   │   ├── Dashboard/
│   │   │   │   ├── OdersBtn/
│   │   │   │   ├── PaymentBtn/
│   │   │   │   └── ProductBtn/
│   │   │   ├── Categories/
│   │   │   │   ├── ForYou/
│   │   │   │   ├── Fshion/
│   │   │   │   └── Mobiles/
│   │   │   └── Header/
│   │   │       ├── Header.css
│   │   │       └── Header.jsx
│   │   ├── LogIn/
│   │   ├── ProductDetails/
│   │   ├── ProfileEditForm/
│   │   ├── ProfilePage/
│   │   └── SignUp/
│   ├── lib/
│   │   ├── model/
│   │   │   ├── cart.js
│   │   │   ├── product.js
│   │   │   └── user.js
│   │   ├── dbConnect.js
│   │   └── verifyToken.js
│   ├── redux/
│   │   ├── action/
│   │   │   ├── adminAction.js
│   │   │   ├── authAction.js
│   │   │   ├── cartAction.js
│   │   │   ├── paymentAction.js
│   │   │   ├── productAction.js
│   │   │   └── userAction.js
│   │   ├── slice/
│   │   │   ├── adminSlice.js
│   │   │   ├── authSlice.js
│   │   │   ├── cartSlice.js
│   │   │   ├── paymentSlice.js
│   │   │   ├── productSlice.js
│   │   │   └── userSlice.js
│   │   └── store.js
│   ├── services/
│   │   └── product/
│   │       ├── productImageUpload.js
│   │       └── imageUpload.js
│   └── utils/
│       └── validate.js
├── .env
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
└── README.md
```

---

## 🔌 API Overview

The backend is built using **Next.js API Route Handlers** located under `src/app/api`. Below are the general categories of APIs used in the project:

| Category | Description |
|---|---|
| **Authentication APIs** | Handle user registration, login, and JWT-based session validation |
| **Product APIs** | Handle fetching product listings and product details |
| **Cart APIs** | Handle adding, updating, removing, and clearing cart items |
| **Payment APIs** | Handle Razorpay order creation and payment verification |
| **Image Upload APIs** | Handle uploading product images to Cloudinary |

> 📝 Exact API endpoint paths depend on the internal route structure (`src/app/api/*`) and are not explicitly listed here unless confirmed. Refer to the `api` folder for the actual implementation.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
MONGODB_URI=
JWT_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

| Variable | Description |
|---|---|
| `MONGODB_URI` | Connection string for your MongoDB database |
| `JWT_SECRET` | Secret key used to sign and verify JWTs |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Public Razorpay Key ID used on the frontend |
| `RAZORPAY_KEY_SECRET` | Private Razorpay secret key used only on the backend |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key used for uploading images |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret used only on the backend |

> ⚠️ **Never commit your `.env.local` file to GitHub.** Add it to `.gitignore` and keep all secrets private.

---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd full-stack-app
npm install
```

---

## ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## 🏗️ Build for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 🛡️ Security Notes

- 🚫 Never expose your **Razorpay secret key** (`RAZORPAY_KEY_SECRET`) on the frontend.
- 🚫 Never expose your **JWT secret** (`JWT_SECRET`) anywhere in client-side code.
- 🚫 Never expose your **Cloudinary API secret** (`CLOUDINARY_API_SECRET`) on the frontend.
- 🚫 Never commit `.env.local` or any file containing secrets to version control.
- ✅ Always validate Razorpay payment verification on the **server side**.
- ✅ Always validate authenticated API requests on the **server side** using JWT verification middleware.
- ✅ Perform image uploads to Cloudinary through the backend, not directly from unauthenticated client code.

---

## 📌 Important Notes

- This project uses **JavaScript/JSX**, not TypeScript.
- Only **Razorpay** is integrated for payments — no Stripe, PayPal, or other gateways.
- Authentication is strictly **JWT + bcryptjs** based; there is no OAuth or social login.
- Image uploads are handled via **Cloudinary**; image URLs are stored in MongoDB.
- The folder structure shown above is representative and may not reflect every file in the actual codebase.

---

## 🚀 Future Improvements

The following features are **not yet implemented** and are listed only as potential future enhancements:

- 📜 Order history for users
- 🧑‍💼 Admin dashboard
- ⭐ Product reviews and ratings
- ❤️ Wishlist functionality
- 🔍 Search and advanced filtering
- 🎟️ Coupon/discount code system
- 📦 Improved order tracking
- 💳 Additional payment providers in the future

---

## 🖼️ Screenshots

> _Add screenshots of your application here to showcase the UI._

```
[Home Page Screenshot]
[Product Details Screenshot]
[Cart Page Screenshot]
[Checkout Page Screenshot]
```

---

## 👤 Author

**Manisha**
Feel free to connect or reach out for feedback and suggestions!

- LinkedIn: [https://www.linkedin.com/in/manisha-nahak-8809883a2](https://www.linkedin.com/in/manisha-nahak-8809883a2)
- GitHub: [https://github.com/nahakmanisha18-cyber](https://github.com/nahakmanisha18-cyber)
- Portfolio: [https://portfolio-app-6eb135.netlify.app/](https://portfolio-app-6eb135.netlify.app/)

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
