# VibeCode Sample Project

This is a sample full-stack application built with **Vue.js** (terminating client) and **NestJS** (server).

## Project Structure

- `client/`: Vue.js frontend application.
- `server/`: NestJS backend application.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Setup & Run

#### Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (copy `.env` example if available, ensures Prisma is configured).
4. Run database migrations (if using Prisma):
   ```bash
   npx prisma migrate dev
   ```
5. Start the server:
   ```bash
   npm run start:dev
   ```
   The server will run on `http://localhost:3000`.

#### Client

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The client will run on `http://localhost:5173` (or similar).

## Features

- **User Management**: Create, read, update, and delete users.
- **Validation**:
  - **Client-side**: Real-time feedback using Vue watchers.
  - **Server-side**: Robust DTO validation using NestJS pipes and Class Validator.
  - **Duplicate Handling**: Graceful error messages for duplicate emails.

## Tech Stack

- **Frontend**: Vue 3, Pinia, TailwindCSS, TypeScript.
- **Backend**: NestJS, Prisma (ORM), TypeScript.
