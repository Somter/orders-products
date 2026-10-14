# Inventory Management SPA (Orders & Products)

A professional, full-stack web application designed for efficient inventory, product, and order management. Fully containerized with Docker and Docker Compose for seamless deployment and production readiness.

---

## Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript, Bootstrap, BEM methodology.
* **Backend:** Node.js, Express, TypeScript (`tsx`), Prisma ORM.
* **Database:** MySQL 8.0 with automated Prisma migrations and database seeding.
* **Containerization:** Docker & Docker Compose (multi-stage builds, healthchecks, isolated networks).

## Project Architecture & Folder Structure

The project is structured as a monorepo containing isolated services orchestrated via Docker[cite: 4, 5]:

```text
orders-products/
├── docker-compose.yml             # Root Docker orchestration for DB, backend, and frontend
├── orders-products-server/        # Backend service (Node.js, Express, Prisma, MySQL)
└── orders-products-client/        # Frontend Next.js SPA
    └── src/
        ├── app/                   # Next.js App Router pages (analytics, login, orders, products, register)[cite: 4]
        ├── components/            # Reusable UI and layout components (analytics, auth, ui)[cite: 4, 5]
        ├── context/               # React Context providers (LanguageContext)[cite: 4, 5]
        ├── locales/               # Localization and translation files[cite: 4, 5]
        ├── services/              # API communication services[cite: 4, 5]
        ├── store/                 # Global state management (slices, hooks, provider)[cite: 4, 5]
        ├── types/                 # TypeScript interfaces and shared types[cite: 4, 5]
        └── utils/                 # Utility functions and test suites (__tests__, calculators)[cite: 4, 5]
 ```       

## System Requirements & Prerequisites

To run this project locally, make sure you have the following tools installed on your operating system:
* **[Docker](https://www.docker.com/)** (Engine version 20.10 or higher)
* **[Docker Compose](https://docs.docker.com/compose/)** (V2 is recommended)
* **Git** (for cloning the repository)

## Quick Start & Installation

1. **Clone the repository and navigate to the project root directory:**
   ```bash
   cd orders-products

2. **Start the application using Docker Compose:**
    This command will build multi-stage images, launch the MySQL database container, automatically apply database migrations, run the seed script with initial test data, and start both the backend and frontend services:
    ```bash
    docker compose up --build

3. **Access the application:**
     
     *   **Frontend (Next.js SPA):** http://localhost:3000
     *   **Backend API (Node.js):** http://localhost:5000
     *   **MySQL Database:** Exposed externally on port `3307`
         *   **Host:** `localhost`
         *   **Port:** `3307`
         *   **Database Name:** `orders_products_db`
         *   **User:** `root`
         *   **Password:** `admin`

### Managing Containers

**Stop the running containers:**

```bash
docker compose down
```

**Stop containers and completely wipe the database volume (reset test data):**

```bash
docker compose down -v
```

## Ports & Access

| Service | Port | URL / Connection Details |
| :--- | :--- | :--- |
| **Frontend SPA** (Next.js) | `3000` | [http://localhost:3000](http://localhost:3000) |
| **Backend API** (Node.js) | `5000` | [http://localhost:5000](http://localhost:5000) |
| **MySQL Database** | `3307` | Host: `localhost`<br>Port: `3307`<br>Database: `orders_products_db`<br>User: `root`<br>Password: `admin` |

## Demo & Live Application

- **Live Demo (Railway):** [https://perfect-miracle-production-1939.up.railway.app](https://perfect-miracle-production-1939.up.railway.app)
- **Video Walkthrough:** [https://drive.google.com/file/d/1QkDikOwMpirJORYkqVqHVouyXK4hqExk/view?usp=sharing]