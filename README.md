# Internship-19-Cart
**A React application for browsing and purchasing products using a local database**

---

## Features
- Browse available products
- Search products brand and their name 
- Filter products by product category (Formal ,Streetwar, etc.)
- Mark products as favorites
- View product details and add them to your cart (you can choose color and product size)
- Order products (you can choose dummy payment methods)
- On order completion order mail is sent to your mail
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
   Variable explanation:<br/>
       PORT  Port where the backend server will run.</br>
       ALLOWED_ORIGINS Comma-separated list of allowed frontend URLs (used for CORS)(you can leave ports like it is in .env.example)</br>
       JWT_SECRET Secret key used for signing authentication tokens (generate with ```run openssl rand -hex 32```)</br>
       DATABASE_URL PostgreSQL connection string </br>
       SMTP Configuration: SendGrid recommended

## Finally
## Run with Docker
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
## Run with turbo
   1. Navigate into the root folder:
      ```
      cd ../..
      ```
   2. Build backend and frontend:
      ```
      npm run build
      ```
   3. Start backend:
      ```
      npm run start
      ```

## Access
   Frontend:
   If you started project with Docker you must have manually started the frontend so the url is:
   ```
   http://localhost:5173/
   ```
   If you started project with turbo then backend is serving frontend content on the same port on which it is running:
   ```
   http://localhost:5173/
   ```
   
   Backend Swagger documentation:
   ```
   http://localhost:3000/api
   ```







