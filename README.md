# Financial Transaction Dashboard

A full-stack financial dashboard where users can view, filter, add, edit, and delete transactions.  
Built with Node.js, Express, TypeScript, React, Axios, and Styled-components.

---

## Tech Stack

- Backend: Node.js + Express + TypeScript
- Frontend: React + TypeScript + Axios + Styled-components
- Database: In-memory (simple JSON file)

---

## Project Structure

financial-dashboard/
├── backend/         # Node.js backend
└── frontend/        # React frontend


## How to Run the Project

### 1. Clone the Repository
git clone https://github.com/your-username/financial-dashboard.git
cd financial-dashboard

### 2. Install Dependencies
npm run install-all
This will install all dependencies for both the backend and frontend.


### 3. Run the Application
npm run dev
(Starts both backend and frontend servers together.)
	•	Backend will run on http://localhost:4000
	•	Frontend will run on http://localhost:3000

### 4. Access the Application
Open your browser and navigate to `http://localhost:3000` to access the financial transaction dashboard.

### 5. API Endpoints
The backend exposes the following API endpoints:
- `GET /api/transactions`: Get all transactions
- `POST /api/transactions`: Add a new transaction
- `PUT /api/transactions/:id`: Update a transaction
- `DELETE /api/transactions/:id`: Delete a transaction

### 6. Features
  •	View all transactions in a table
	•	Filter transactions by category and status
	•	Add new transactions via a modal form
	•	Edit existing transactions
	•	Delete transactions
	•	Responsive design for mobile and desktop
	•	Pagination for transactions list
	•	Unit tests for backend API endpoints
	•	User-friendly interface

###  7. Testing
Basic unit tests are included for backend API endpoints using Jest and Supertest.

To run tests:
cd backend
npm run test

All main CRUD endpoints are tested: GET, POST, PUT, DELETE.

### Future Improvements
	•	Add input validations for forms
	•	Server-side pagination for large datasets
	•	Authentication (login/register)
	•	Improved mobile design and animations
	•	Full test coverage and CI integration

