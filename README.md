# Learning Resources Catalog - README

This project is a complete web application consisting of a catalog of learning resources. It includes a frontend built with Next.js, a backend CMS managed by Strapi, a favorites service built with NestJS, and a PostgreSQL database. The entire stack is orchestrated using Docker Compose.

## Project Architecture

The project consists of the following services:

1. **Frontend (Next.js):** The main user interface for browsing and viewing learning resources. Runs on port `3000`.
2. **CMS (Strapi):** Content management system for administering learning resources. Runs on port `1337`.
3. **Favorites Service (NestJS):** A microservice for managing users' favorite resources. Runs on port `3001`.
4. **Database (PostgreSQL):** Database used by Strapi to store content. Accessible on port `5432`.

## Prerequisites

* Docker and Docker Compose installed on your system.

## How to Start the Project with Docker

The easiest way to start all services is using Docker Compose.

1. **Clone the repository** ([if you haven't already](https://github.com/Valar789/learning-resources-catalog)).
2. **Navigate to the project root** where the `docker-compose.yml` file is located.
3. **Run the following command** in your terminal:

   ```bash
   docker-compose up --build
   ```

   * `--build`: This flag ensures that the Docker images for the `strapi`, `nextjs`, and `favorites-service` services are built (or rebuilt if they have changed) before starting the containers.
   * `up`: This command creates and starts the containers defined in `docker-compose.yml`.

4. **Wait for all services to start.** You will see the logs for each service in your terminal.
5. **Access the services:**
   * **Frontend (Next.js):** Open your browser and go to `http://localhost:3000`.
   * **CMS (Strapi Admin):** Access `http://localhost:1337/admin`. The first time you access it, you will need to create an administrator account.
   * **Favorites Service (API):** The API will be available at `http://localhost:3001`. You can view the Swagger documentation at `http://localhost:3001/api`.
   * **Database (PostgreSQL):** Accessible internally to the other containers at `postgres:5432`.

## Individual Service Development (Without Docker Compose)

If you prefer to run the services individually for development:

### 1. Strapi CMS (`strapi-cms`)

* Navigate to the `strapi-cms` directory.
* Install dependencies: `npm install` or `yarn install`.
* Start in development mode: `npm run develop` or `yarn develop`.
* Start in production mode: `npm run start` or `yarn start`.
* You will need to configure the database environment variables manually if not using Docker.

### 2. Next.js Frontend (`next-frontend`)

* Navigate to the `next-frontend` directory.
* Install dependencies: `npm install` or `yarn install` or `pnpm install`.
* Start the development server: `npm run dev` or `yarn dev` or `pnpm dev`.
* Open `http://localhost:3000` in your browser.

### 3. NestJS Favorites Service (`nest-favorites-service`)

* Navigate to the `nest-favorites-service` directory.
* Install dependencies: `npm install`.
* Start in development mode (with watch): `npm run start:dev`.
* Start in production mode: `npm run start:prod`.
* The service will be available at `http://localhost:3001`.

## Directory Structure (Summary)

```
├── docker-compose.yml         # Docker services orchestration
├── nest-favorites-service/    # Favorites Microservice (NestJS)
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── next-frontend/             # Frontend Application (Next.js)
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── strapi-cms/                # Backend CMS (Strapi)
│   ├── config/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── postgres-data/             # Volume for PostgreSQL data persistence
└── README.md                  # This file
```

## Stopping the Application

To stop all containers started with `docker-compose up`:

1. Press `Ctrl + C` in the terminal where you ran `docker-compose up`.
2. To ensure containers and networks are removed, run:
   ```bash
   docker-compose down
   ```
3. If you also want to remove volumes (this will delete database data!), use:
   ```bash
   docker-compose down -v
   ```
