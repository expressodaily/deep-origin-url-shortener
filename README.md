# Deep Origin URL Shortener

A full-stack URL shortener monorepo application that contains both the **frontend** (React with TypeScript) and **backend** (Node.js with TypeScript) applications. It implements both the basic requirements and extra features as specified.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)

## Overview

This project is a URL shortener that converts long URLs into short, unique slugs. When a short URL is accessed, it redirects to the original URL. In addition to the basic functionality, the project includes extra features such as:

- URL validation with error messaging.
- Option to customize the slug.
- Copy-to-clipboard functionality for the shortened URL.
- User accounts to manage and view personal shortened URLs.
- Visit tracking and a dashboard to visualize URL popularity.
- Rate limiting to prevent abuse.

## Features

### Basic Features
- **Shorten URL:** Convert a long URL to a short, unique slug.
- **Redirection:** Accessing the shortened URL redirects to the original URL.
- **404 Handling:** Displays a 404 Not Found page for invalid slugs.
- **URL Listing:** View a list of all URLs saved in the database.

### Extra Features
- **User Accounts:** Register and log in to manage your own URLs.
- **URL Validation:** Checks if the provided URL is valid.
- **Custom Slug:** Allows users to modify the auto-generated slug.
- **Copy Functionality:** Easy copy-to-clipboard for the shortened URL.
- **Visit Tracking:** Monitor how many times each URL has been visited.
- **Dashboard:** Visual analytics on URL popularity.
- **Rate Limiting:** Prevent abuse from excessive requests.
- **Docker Support:** Containerized deployment for easier setup.

## Tech Stack

### Frontend
- **React** with TypeScript
- Tailwind CSS for styling
- Additional libraries as needed (e.g., React Router, axios)

### Backend
- **Node.js** with TypeScript
- Express
- MongoDB with Mongoose

### Other Tools
- Docker for containerization
- ESLint/Prettier for code quality and formatting

## Project Structure

```
deep-origin-url-shortener/
├── frontend/          # React frontend application
├── backend/           # Node.js backend application
└── README.md          # Project documentation
```

## Installation

### Prerequisites
- Node.js (v12+)
- npm or yarn
- Docker (optional, for containerized deployment)

### Clone the Repository

```bash
git clone https://github.com/expressodaily/deep-origin-url-shortener.git
cd deep-origin-url-shortener
```

### Install Dependencies

#### Frontend
```bash
cd frontend
npm install   # or yarn install
```

#### Backend
```bash
cd ../backend
npm install   # or yarn install
```

## Configuration

Configure environment variables for the backend. Create a `.env` file in the `backend` directory.

```
PORT=
FRONTEND_PUBLIC_URL=
DB_NAME=
DB_HOST=
DB_PORT=
DB_MIN_POOL_SIZE=
DB_MAX_POOL_SIZE=

JWT_SECRET=

```

## Running the Application

### Development Mode

#### Backend
In the `backend` directory:
```bash
npm run dev
```

#### Frontend
In the `frontend` directory:
```bash
npm run dev
```

Your application should be available at:
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000) (or as configured in env)

### Production Mode

Build the projects and start the production servers:

#### Frontend
```bash
npm run build
```

#### Backend
```bash
npm run build
npm start
```

## Docker Deployment

To build and run the application using Docker:

1. **Build the Docker Image:**

   ```bash
   docker build -t deep-origin-url-shortener .
   ```

2. **Run the Docker Container:**

   ```bash
   docker run -p 5173:5173 -p 5000:5000 deep-origin-url-shortener
   ```
