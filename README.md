# Marteelo

A modern e-commerce storefront built with **React 19**, **Vite** and **Tailwind CSS**. It features a product catalog, a slide-out cart, a checkout page with promo codes and live order totals, user sign-up/login, and a user dashboard.

All state is handled on the client with React's `useReducer` + Context API, so no backend is required.

---

## Features

- **Product catalog**: a product grid with prices, ratings, badges, stock status and categories.
- **Home page**: a hero section, a product carousel and customer testimonials.
- **Cart sidebar**: opens when a product is added, with increase/decrease quantity and remove item.
- **Smart cart logic**: adding the same product again increases its quantity instead of creating a duplicate row, and an item is removed when its quantity reaches 0.
- **Checkout page**:
  - Order summary with per-item quantity controls
  - Promo code support (`STUDIO10` gives 10% off)
  - Live **Subtotal → Discount → Total** that updates instantly
- **Authentication**: sign up and log in with toast notifications.
- **User dashboard**: order history, saved addresses and personal details.
- **Responsive UI**: built with Tailwind CSS, plus Ant Design components and icons.

## Tech Stack

| Area | Tools |
|---|---|
| Framework | React 19, Vite |
| Routing | React Router v7 |
| State management | Context API + `useReducer` |
| Styling | Tailwind CSS v4 |
| UI components | Ant Design, Lucide React, React Icons |
| Notifications | React Toastify |
| Linting | ESLint |

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/Sk7440/Marteelo.git
cd Marteelo
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── App.jsx                  # Routes + cart provider
├── main.jsx                 # Entry point + auth provider
├── pages/                   # Home, Products, Checkout, Login, Signup, About
├── components/layouts/      # Navbar, Sidebar (cart), Footer, Hero, Layout
├── Dashboard/               # User dashboard
├── Features/
│   ├── Cart/                # Cart context + reducer
│   └── Auth/                # Auth context + reducer
├── data/                    # Product data, carousel, reviews
└── lib/Antdesign/           # Ant Design carousel wrapper
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/products` | Product catalog |
| `/checkout` | Order summary and totals |
| `/login` | Login |
| `/signup` | Sign up |
| `/about` | About |
| `/User` | User dashboard |

## How the Cart Works

Cart state lives in `Features/Cart/Cartcontext.jsx` and is updated through a reducer (`Reducerfn.jsx`) with these actions:

| Action | Effect |
|---|---|
| `ADDED TO CART` | Adds a product, or increases its qty if it's already in the cart |
| `INCREASE_QTY` | Quantity + 1 |
| `DECREASE_QTY` | Quantity − 1 (removes the item at 0) |
| `DELETE_FROM_CART` / `REMOVE_FROM_CART` | Removes the item |

Checkout totals are calculated from the cart on every render:

```js
const subtotal = state.cart.reduce((sum, ele) => sum + ele.price * ele.qty, 0);
const discount = appliedPromo ? subtotal * 0.10 : 0;
const total = subtotal - discount;
```

## Limitations

This is a front-end demo project:

- Cart and user accounts are stored **in memory only**, so they reset on page refresh.
- Passwords are not hashed and there is no real authentication server.
- No payment gateway is integrated.

## Future Improvements

- Persist the cart and session with `localStorage`
- Connect a backend (Node/Express or Firebase) for real authentication and orders
- Add Stripe checkout
- Product search, filters and a product detail page

## Author

**Sk7440**: [github.com/Sk7440](https://github.com/Sk7440)