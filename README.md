# Internship-19-Cart
**A React application for browsing and purchasing products using a local database**

---

## Features
- Browse available products
- Search products brand and their name 
- Filter products by product category (Formal ,Streetwar, etc.)
- View product details and add them to your cart (you can choose color and product size)
- Mark products as favorites 
---

## Requirements
- Node.js (v18+ recommended)
- npm (Node Package Manager)
- Docker & Docker Compose:
---

## Installation
1. Clone the repository:
```
git clone git@github.com:DorianLeci/Internship-19-Cart.git
```

2. Navigate into the project folder:
```
cd Internship-19-Cart
```

## Environment Variables
1. Navigate into the api(backend) folder:
   ```
   cd services/api
   ```

2. Copy the example environment file content into .env:
   ```
   cp .env.example .env
   ```
   Variable explanation:
       PORT  Port where the backend server will run.
    ALLOWED_ORIGINS Comma-separated list of allowed frontend URLs (used for CORS)(you can leave ports like it is in .env.example)
    JWT_SECRET Secret key used for signing authentication tokens (generate with ```run openssl rand -hex 32```)
    DATABASE_URL PostgreSQL connection string:

4. Open .env and add your JWT secret: JWT_SECRET=your_secret_here

## Finally
1. Navigate into the root folder:
   ```
   cd ../..
   ```
2. Run backend and database with docker compose:
-  Windows/Mac
   ```
   docker compose up --build
   ```
-  Linux
   ```
   sudo usermod -aG docker $USER
   docker compose up --build
   ```
---
3. Navigate into the web folder:
   ```
   npm run dev
   ```

## Access

   Frontend:
   ```
   http://localhost:5173/
   ```
   Backend Swagger documentation:
   ```
   http://localhost:3000/api
   ```







