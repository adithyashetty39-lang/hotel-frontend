# Roomify - Hotel Management System

A modern Hotel Management System (HMS) web application built with React, demonstrating advanced Database Management System (DBMS) concepts including 3NF normalization, stored procedures, triggers, and Role-Based Access Control (RBAC).

## Project Overview

Roomify is a centralized hotel management system with a sleek, vibrant frontend that masks complex database operations. The application features user authentication, dashboard analytics, booking management, and guest profiles.

**Core DBMS Skills Demonstrated:**
- 3rd Normal Form (3NF) relational schema
- Server-Side Objects (Triggers, Stored Procedures, Functions)
- Data Integrity (Advanced constraints, ACID transactions)
- Role-Based Access Control (RBAC)

## Tech Stack

### Frontend (Current)
- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v7
- **Icons:** Lucide React

### Backend (Planned)
- **Framework:** FastAPI (Python)
- **Database:** MySQL 8.0+
- **ORM:** SQLAlchemy 2.0 (Async)
- **Authentication:** JWT + Passlib

## Project Structure

```
Roomify/
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/          # AppLayout, SideNavBar, TopNavBar
│   │   ├── pages/               # Page components
│   │   │   ├── Login.tsx        # User authentication
│   │   │   ├── SignUp.tsx       # User registration
│   │   │   ├── Dashboard.tsx    # Main dashboard with metrics
│   │   │   ├── Bookings.tsx     # Booking management
│   │   │   └── GuestProfile.tsx # Guest profile & history
│   │   ├── data/
│   │   │   └── mockData.ts      # Mock data for development
│   │   ├── App.tsx              # Main app with routing
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── stitch_designs/          # Stitch design files
│   ├── dist/                    # Production build
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── prd.md                       # Product Requirements Document
├── tech_stack.md                # Technical Architecture
├── design_doc.md                # UI/UX Design Document
└── README.md                    # This file
```

## Prerequisites

- **Node.js:** v18 or higher
- **npm:** v9 or higher

## Installation

Follow these steps to get the project running on your local machine:

### 1. Navigate to the Frontend Directory

```bash
cd Roomify/frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router DOM
- Tailwind CSS
- Lucide React icons
- TypeScript & Vite

### 3. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (default Vite port).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Features

### Current Features
- **User Authentication** - Login and SignUp pages
- **Dashboard** - Real-time metrics and room status overview
- **Booking Management** - View and manage hotel bookings
- **Guest Profiles** - Guest information and booking history
- **Responsive Navigation** - Side navbar and top navigation bar
- **Modern UI** - Clean, vibrant design with custom Tailwind theme

### Planned Features (Backend)
- **Database Integration** - MySQL with full 3NF schema
- **Stored Procedures** - `sp_ProcessBookingTransaction`, `sp_GenerateEndOfDayReport`
- **Database Triggers** - Auto room status updates, audit logging
- **RBAC** - Guest, Receptionist, Admin roles
- **API Endpoints** - RESTful API via FastAPI

## Database Schema (Planned)

The database follows 3rd Normal Form (3NF) with these core entities:

- **Guests** - Guest information and authentication
- **Rooms** - Room details and status
- **Room_Types** - Room categories (Deluxe, Standard, Suite)
- **Bookings** - Booking transactions
- **Payments** - Payment records
- **Staff** - Staff management

## Design System

The UI follows a "Fresh" aesthetic with:
- **Primary Color:** Mint Green (#2ecc71 / #10B981)
- **Background:** Clean off-white (#F9FAFB)
- **Typography:** Manrope (headlines), Plus Jakarta Sans (body)
- **Component Style:** Soft shadows, rounded corners (12-16px)

## Environment Variables

No environment variables required for frontend development. For production build, you may need to configure:

- Vite configuration for API proxying
- Environment-specific URLs

## License

This project is for demonstration purposes.
