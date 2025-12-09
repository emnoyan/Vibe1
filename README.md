# VibeCode Sample Project

This is a sample full-stack application built with **Vue.js** (client) and **NestJS** (server).

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
3. Set up environment variables (copy `.env` example if available).
4. Run database migrations:
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

### User Management
- **CRUD Operations**: Complete management of users (Create, Read, Update, Delete).
- **Filtering & Search**: Search users by query, filter by role or status.
- **Bulk Actions**: Delete multiple users at once.

### Blog Post Management
- **Public & Admin Views**: Separate interfaces for public viewing and admin management.
- **Rich Content**: Create and edit posts with titles, categories, images, and content.
- **Category System**: Organize posts with dynamically managed categories.

### Invoice Management (New)
- **Full Invoicing System**: Create professional invoices with custom line items.
- **Calculations**: Automatic total and subtotal calculations.
- **Status Tracking**: Track invoice status (Pending, Paid, Cancelled).
- **Responsive Tables**: Sortable and searchable invoice lists.

### UI/UX Improvements
- **Sticky Headers**: Admin views feature sticky headers for easy access to actions while scrolling.
- **Refined Layouts**: Consistent spacing, padding, and alignment across all admin screens.
- **Modal Interfaces**: Smooth, accessible modals for creation and editing forms.
- **Real-time Validation**: Immediate feedback on form inputs.

## Tech Stack

- **Frontend**: Vue 3 (Composition API), Pinia (State Management), TailwindCSS, TypeScript.
- **Backend**: NestJS, Prisma (ORM), TypeScript, Postgres/SQLite.
- **Testing**: Vitest for unit and component testing.
