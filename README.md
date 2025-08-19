
# ERP-ASA (Enterprise Resource Planning - Human Resources Module)

## Overview

This project is the foundation of a modular **Enterprise Resource Planning (ERP)** system, currently featuring a **Human Resources module**.  
It is built using a **layered architecture** with a clear separation of concerns between routes, controllers, services, and repositories.  
The ERP is designed to be **scalable, secure, and extensible**, making it easy to add future modules such as stock management, point-of-sale, CRM, accounting, and marketing.

---

## Key Features

- **Layered Architecture**  
  - Clean separation of concerns with dedicated layers for `routes`, `controllers`, `services`, and `repositories`.  
  - Improves maintainability, scalability, and testing.

- **Authentication & Authorization**  
  - JWT-based token authentication for secure access.  
  - Role-based access control for different types of users.

- **Password Management**  
  - Secure password hashing with industry best practices.  
  - Password recovery and reset flow implemented.

- **Employee & User Management**  
  - Each employee can be linked to a user account.  
  - Cascade deletion ensures that when an employee is removed, its associated user is also removed.

- **Integration with Third-Party APIs**  
  - External API integration for handling and storing employee profile photos.  
  - Decoupled design to allow easy integration of new external services.

- **Frontend Integration**  
  - React.js frontend consuming the Flask backend via REST API.  
  - Flux architecture (`appContext.js` & `flux.js`) to manage global state.  
  - Persistent state using `localStorage`.

- **CORS & Deployment Ready**  
  - CORS properly configured for development and production environments.  
  - Modular project structure (`src/backend`, `src/frontend`, central `app.py`).

---

## Tech Stack

- **Backend**: Python, Flask, SQLAlchemy, Flask-JWT, Flask-Mail  
- **Frontend**: React.js, Flux, Context API, Bootstrap  
- **Database**: PostgreSQL (extensible to MySQL or SQLite)  
- **Authentication**: JWT (JSON Web Tokens)  
- **Other**: Flask-Admin for admin dashboards, RESTful API design

---

## Roadmap & Expansion Plans

This ERP is envisioned as a **modular platform**. Currently focused on Human Resources, the long-term plan is to expand into additional business domains:

1. **Stock Management**  
   - Inventory control with real-time stock optimization.  
   - Automatic reorder points and supplier management.  

2. **Point of Sale (POS)**  
   - Support for credit card payments and digital wallets.  
   - Automatic invoice generation and tax calculation.  

3. **Customer Relationship Management (CRM)**  
   - Lead management and conversion analytics.  
   - Sales pipeline visualization and customer segmentation.  

4. **Accounting & Finance**  
   - Expense tracking and financial forecasting.  
   - Advanced analytics for identifying cost-saving opportunities.  

5. **Marketing Automation**  
   - Campaign scheduling and performance tracking.  
   - Integration with mailing services and lead scoring.  

6. **Additional Future Modules**  
   - **Project Management**: task assignments, deadlines, Gantt charts.  
   - **Business Intelligence (BI)**: dashboards with real-time KPIs.  
   - **E-commerce Integration**: product catalog, online orders, customer accounts.  

The modular architecture ensures that each of these components can be developed independently while sharing a common core.

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/RGAlvaro/ERP-ASA-final-project

# Backend setup
cd src/backend
pipenv install
pipenv run upgrade
pipenv run start

# Frontend setup
cd src/frontend
npm install
npm run start
