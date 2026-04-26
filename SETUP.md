# GrabExpress Clone - Setup Guide

## Project Structure
```
GrabExpress/
├── frontend/          React + TailwindCSS (port 5173)
├── backend/           Node.js + Express (port 5000)
└── database/          MySQL schema & seed data
```

## Step 1: Database Setup (MySQL Workbench)
1. Open MySQL Workbench and connect to your local server
2. Open and run `database/schema.sql` — creates the database and tables
3. Open and run `database/seed.sql` — loads sample data (optional)

## Step 2: Backend Setup
1. Open `backend/.env` and set your MySQL password:
   ```
   DB_PASSWORD=your_actual_mysql_password
   ```
2. Open terminal in `backend/` and run:
   ```bash
   npm install   # (already done)
   npm run dev   # starts on http://localhost:5000
   ```

## Step 3: Frontend Setup
1. Open terminal in `frontend/` and run:
   ```bash
   npm run dev   # starts on http://localhost:5173
   ```

## Test Accounts (after running seed.sql)
| Email                    | Password    | Role     |
|--------------------------|-------------|----------|
| juan@example.com         | password    | Customer |
| maria@example.com        | password    | Customer |
| admin@grabexpress.com    | password    | Admin    |

> Note: The seed.sql uses bcrypt hash for 'password' — use that as the login password.
> Or just register a new account through the UI.

## Features
- Register / Login with JWT auth
- Send Package — 2-step form with pickup/dropoff addresses, package size, service type
- Live price estimate (Instant: 2×, Same Day: 1.5×, Next Day: 1×)
- Track Order by tracking number (public, no login needed)
- Order History with search & filter
- Dashboard with stats and recent orders
- Pricing Calculator page
- Responsive design (mobile + desktop)

## Pages
| Path         | Description               | Auth Required |
|--------------|---------------------------|---------------|
| /            | Home                      | No            |
| /send        | Send a package            | Yes           |
| /track       | Track by tracking number  | No            |
| /pricing     | Pricing calculator        | No            |
| /history     | Order history             | Yes           |
| /dashboard   | User dashboard            | Yes           |
| /login       | Login                     | No            |
| /register    | Register                  | No            |
