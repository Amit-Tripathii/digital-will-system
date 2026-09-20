# 🔐 DigiWill — Digital Legacy Management System

> A secure web-based platform for managing digital assets, nominees, and inactivity-based digital legacy notifications.

DigiWill is a full-stack web application that helps users securely manage their important digital assets and define nominees who can be notified after prolonged account inactivity.

The system combines authenticated asset management, application-level encryption, nominee management, and a Dead-Man Switch mechanism that monitors user activity and starts the configured digital legacy workflow after a defined period of inactivity.

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Key Features](#key-features)
- [Dead-Man Switch](#dead-man-switch)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Authentication & Authorization](#authentication--authorization)
- [Database Design](#database-design)
- [API Overview](#api-overview)
- [Frontend Pages](#frontend-pages)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Testing](#testing)
- [Security](#security)
- [Future Enhancements](#future-enhancements)
- [Project Workflow](#project-workflow)
- [Project Status](#project-status)
- [Learning Outcomes](#learning-outcomes)
- [Academic Relevance](#academic-relevance)
- [Disclaimer](#disclaimer)
- [Author](#author)
- [License](#license)

---

## Overview

Digital accounts are an important part of modern life. Users may have multiple online accounts, credentials, subscriptions, documents, and other digital information that can become inaccessible to family members or trusted individuals if the account owner becomes unavailable.

DigiWill provides a centralized platform where users can:

- Store information about their digital assets
- Protect stored asset passwords using encryption
- Manage nominees or beneficiaries
- Monitor their Dead-Man Switch status
- Confirm their activity manually
- Receive inactivity warnings
- Trigger a nominee notification workflow after prolonged inactivity

The application is built with a **React** frontend, a **Node.js/Express** backend, and **MongoDB** as the database.

---

## Problem Statement

Traditional wills primarily focus on physical assets such as:

- Property
- Bank accounts
- Investments
- Jewellery
- Physical documents

However, users increasingly own significant digital assets, including:

- Email accounts
- Social media accounts
- Cloud storage
- Online subscriptions
- Digital services
- Important online credentials

There is often no centralized mechanism for users to organize this information and define how trusted individuals should be notified when the account owner becomes inactive.

DigiWill attempts to address this problem with a dedicated digital legacy management platform.

---

## Objectives

1. Provide authenticated users with a centralized digital asset vault.
2. Protect sensitive asset passwords using encryption.
3. Allow users to add and manage nominees.
4. Monitor user activity through a Dead-Man Switch.
5. Send inactivity warning emails to users.
6. Trigger nominee notifications after prolonged inactivity.
7. Ensure users can only access and modify their own assets and nominees.
8. Provide a clean and responsive web interface.
9. Keep sensitive configuration out of source code using environment variables.

---

## Key Features

### 🔐 User Authentication

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Protected frontend routes
- Session token storage

Passwords are never stored as plain text.

### 🗄️ Digital Asset Vault

Each asset can contain:

- Asset name
- Platform
- Username
- Password
- Notes

Supported operations:

- Create, view, edit, and delete assets
- Retrieve an asset password when authorized

Asset passwords are encrypted before being stored in MongoDB.

### 🔒 Application-Level Encryption

DigiWill uses CryptoJS AES encryption for sensitive asset passwords. The application stores the encrypted value instead of the original password.

```text
User Password
      │
      ▼
Application
      │
      ▼
AES Encryption
      │
      ▼
Encrypted Password
      │
      ▼
MongoDB
```

When an authorized user requests a password, the backend decrypts the stored value.

> **Note:** DigiWill uses application-level encryption for stored asset passwords. The project does not claim end-to-end encryption.

### 👥 Nominee Management

Users can register nominees who may be notified when the Dead-Man Switch workflow is triggered.

Nominee information includes:

- Name
- Relationship
- Email
- Phone number

Users can add, view, edit, and delete nominees.

---

## Dead-Man Switch

The Dead-Man Switch is one of the core features of DigiWill. It monitors the time elapsed since the user's last recorded activity.

| Inactivity Period | System Behavior  |
| ----------------- | ---------------- |
| Less than 30 days | Active           |
| 30–59 days        | Warning          |
| 60+ days          | Trigger workflow |

### Activity Tracking

User activity updates the `lastActive` field. Examples include:

- Login
- Asset API activity
- Nominee API activity
- Manual **"I'm Active"** confirmation

The user can confirm activity at any time using the **I'm Active** button, which updates the activity timestamp and resets the inactivity state.

### Inactivity Warning

When the user has been inactive for at least 30 days but less than 60 days, the scheduled job sends an inactivity warning email to the user.

```text
User becomes inactive
        │
        ▼
     30 days
        │
        ▼
Inactivity Warning Email
        │
        ▼
User logs in / confirms activity
        │
        └──────► Timer resets
```

### Digital Will Trigger

When inactivity reaches 60 days:

```text
60+ Days Inactive
        │
        ▼
Check User Status
        │
        ▼
Find Registered Nominees
        │
        ▼
Send Notification Emails
        │
        ▼
Mark Workflow as Triggered
```

The current implementation sends nominee notification emails and marks the user as triggered.

---

## System Architecture

```text
                    ┌─────────────────────────┐
                    │       User Browser      │
                    │                         │
                    │   React + Vite +        │
                    │   Tailwind CSS          │
                    └────────────┬────────────┘
                                 │
                                 │ HTTPS / REST API
                                 ▼
                    ┌─────────────────────────┐
                    │      Node.js Server     │
                    │        Express.js       │
                    │                         │
                    │  Authentication         │
                    │  Authorization          │
                    │  Asset Management       │
                    │  Nominee Management     │
                    │  Dead-Man Switch        │
                    └────────────┬────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │                             │
                  ▼                             ▼
       ┌─────────────────────┐       ┌─────────────────────┐
       │    MongoDB Atlas    │       │     Nodemailer      │
       │                     │       │                     │
       │ Users               │       │ Email Notifications │
       │ Assets              │       │                     │
       │ Nominees            │       └─────────────────────┘
       └─────────────────────┘
```

---

## Technology Stack

### Frontend

| Technology   | Purpose             |
| ------------ | ------------------- |
| React        | User interface      |
| Vite         | Frontend build tool |
| Tailwind CSS | Styling             |
| React Router | Client-side routing |
| Axios        | API communication   |
| Lucide React | Icons               |

### Backend

| Technology    | Purpose                          |
| ------------- | -------------------------------- |
| Node.js       | Runtime                          |
| Express.js    | REST API                         |
| Mongoose      | MongoDB object modeling          |
| MongoDB Atlas | Database                         |
| JWT           | Authentication                   |
| bcryptjs      | Password hashing                 |
| CryptoJS      | Asset password encryption        |
| Nodemailer    | Email notifications              |
| node-cron     | Scheduled Dead-Man Switch checks |
| dotenv        | Environment configuration        |
| CORS          | Cross-origin API access          |

---

## Project Structure

```text
digital-will-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── willController.js
│   ├── middleware/
│   │   ├── activity.js
│   │   └── auth.js
│   ├── models/
│   │   ├── Asset.js
│   │   ├── Nominee.js
│   │   └── User.js
│   ├── routes/
│   │   ├── assets.js
│   │   ├── auth.js
│   │   ├── deadman.js
│   │   └── nominees.js
│   ├── utils/
│   │   ├── cronJobs.js
│   │   ├── encryption.js
│   │   └── sendEmail.js
│   ├── public/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── assets/
│   │   │   ├── auth/
│   │   │   ├── layout/
│   │   │   ├── nominees/
│   │   │   └── ui/
│   │   ├── pages/
│   │   │   ├── AssetVault.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DeadManSwitch.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Nominees.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── SecurityLog.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Authentication & Authorization

### Login Flow

DigiWill uses JWT-based authentication.

```text
User
 │  Email + Password
 ▼
Express API
 │
 ▼
Find User
 │
 ▼
bcrypt Password Verification
 │
 ▼
Generate JWT
 │
 ▼
Return Token
 │
 ▼
Frontend stores token
```

The frontend attaches the token to authenticated API requests:

```text
Authorization: Bearer <token>
```

Backend middleware verifies the token before allowing access to protected routes.

### Ownership Authorization

Authentication alone is not sufficient for a multi-user application, so DigiWill also verifies resource ownership.

```text
User A                 User B
 ├── Asset A            ├── Asset B
 └── Nominee A          └── Nominee B
```

If User B attempts to access or modify User A's resources, the backend verifies ownership and rejects the request.

---

## Database Design

DigiWill uses three primary MongoDB collections. The `userId` field establishes ownership of assets and nominees.

### User

```text
User
├── name
├── email
├── password
├── lastActive
├── isTriggered
├── createdAt
└── updatedAt
```

### Asset

```text
Asset
├── userId
├── assetName
├── platform
├── username
├── encryptedPassword
├── notes
├── createdAt
└── updatedAt
```

### Nominee

```text
Nominee
├── userId
├── nomineeName
├── relationship
├── nomineeEmail
├── phone
├── createdAt
└── updatedAt
```

---

## API Overview

### Authentication

| Method | Endpoint             | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/auth/register` | Create a new user account                |
| POST   | `/api/auth/login`    | Authenticate the user and return a JWT   |
| GET    | `/api/auth/profile`  | Return the authenticated user's profile  |

### Assets

All asset operations require authentication.

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| POST   | `/api/assets`              | Create an asset      |
| GET    | `/api/assets`              | Get the user's assets |
| GET    | `/api/assets/:id/password` | Get an asset password |
| PUT    | `/api/assets/:id`          | Update an asset      |
| DELETE | `/api/assets/:id`          | Delete an asset      |

### Nominees

Nominee resources are protected by authentication and ownership checks.

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/nominees`      | Create a nominee   |
| GET    | `/api/nominees`      | Get nominees       |
| PUT    | `/api/nominees/:id`  | Update a nominee   |
| DELETE | `/api/nominees/:id`  | Delete a nominee   |

### Dead-Man Switch

| Method | Endpoint               | Description                                                           |
| ------ | ---------------------- | --------------------------------------------------------------------- |
| GET    | `/api/deadman/status`  | Returns current status, inactive days, last activity, and trigger state |
| POST   | `/api/deadman/activate`| Updates the activity timestamp and resets the active state            |

---

## Frontend Pages

| Page             | Description                                                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard        | Overview of asset count, beneficiary count, Dead-Man Switch status, vault status, and registered nominees                                    |
| Asset Vault      | View, add, edit, and delete digital assets and stored credentials                                                                            |
| Nominees         | View, add, edit, and delete nominees                                                                                                         |
| Dead-Man Switch  | Current inactivity status, inactivity period, and activity confirmation                                                                      |
| Security Log     | Interface for security-related information. Currently a frontend UI only; it is not a complete server-side audit logging system              |
| Settings         | User account-related interface, including logout                                                                                             |

---

## Installation & Setup

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account
- Git
- A Gmail account with an App Password (if email notifications are required)

### Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY>
cd digital-will-system
```

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_gmail_app_password
```

> ⚠️ Never commit this file to Git.

### Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Start the Backend

From the `backend/` directory:

```bash
node server.js
```

The backend runs on the configured server port.

### Start the Frontend

From the `frontend/` directory:

```bash
npm run dev
```

The Vite development server prints the local frontend URL.

---

## Deployment

DigiWill is deployed with a separate frontend and backend architecture.

```text
                     Internet
                        │
                        ▼
             ┌─────────────────────┐
             │       Vercel        │
             │   React Frontend    │
             └──────────┬──────────┘
                        │ REST API
                        ▼
             ┌─────────────────────┐
             │       Render        │
             │  Node/Express API   │
             └──────────┬──────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │    MongoDB Atlas    │
             │      Database       │
             └─────────────────────┘
```

| Component | Service       |
| --------- | ------------- |
| Frontend  | Vercel        |
| Backend   | Render        |
| Database  | MongoDB Atlas |
| Email     | Nodemailer    |

### Production Environment Variables

Backend:

```env
MONGO_URI=
JWT_SECRET=
ENCRYPTION_KEY=
EMAIL_USER=
EMAIL_PASS=
```

Frontend:

```env
VITE_API_URL=
```

Sensitive backend environment variables must never be committed to GitHub.

---

## Testing

The application has been tested across the following areas.

**Authentication**

- User registration and login
- Invalid credentials
- JWT authentication
- Protected routes

**Assets**

- Add, view, edit, and delete asset
- Password encryption and retrieval
- Ownership authorization

**Nominees**

- Add, view, edit, and delete nominee
- Ownership authorization

**Authorization**

Cross-user access testing verified that one user cannot:

- View another user's asset password
- Edit or delete another user's asset
- Edit or delete another user's nominee

Unauthorized operations are rejected by the backend.

### Dead-Man Switch Testing

The Dead-Man Switch was tested using controlled inactivity timestamps.

```text
~30+ days inactive  →  Warning state  →  Inactivity email
~60+ days inactive  →  Trigger workflow  →  Nominee notification  →  User marked as triggered
```

The cron schedule was temporarily modified during testing and restored to the daily production schedule:

```text
0 0 * * *
```

This runs the scheduled check once per day at midnight, according to the server's configured timezone.

---

## Security

### Implemented Mechanisms

- **Password hashing:** User passwords are hashed with bcrypt before storage.
- **JWT authentication:** Authenticated API requests require a valid JWT.
- **Ownership validation:** Protected resources are checked against the authenticated user's ID.
- **Asset password encryption:** Asset passwords are encrypted before being stored in MongoDB.
- **Environment variables:** Secrets (MongoDB credentials, JWT secret, encryption key, email credentials) are kept out of source code.
- **CORS:** Enables communication between the deployed frontend and backend. For production hardening, it should be restricted to trusted frontend origins.

### Security Limitations

DigiWill is an academic software engineering project and should not be considered a production-grade password manager or a legally enforceable digital-will platform without additional security and legal controls.

- The encryption key is managed by the application backend.
- The system is not end-to-end encrypted.
- There is currently no complete server-side audit logging system.
- Email-based nominee notification does not by itself establish legal identity or death verification.
- The Dead-Man Switch is based on account inactivity, not independent verification of a user's death.
- Additional security controls would be required for a high-security production system.

---

## Future Enhancements

**🔐 Advanced Security**

- Two-factor authentication
- Email verification and password reset
- Device/session management
- Rate limiting
- Refresh tokens
- Security headers
- More restrictive CORS configuration

**📋 Audit System**

A backend audit log could record login events, asset creation/updates/deletion, password access, nominee changes, and Dead-Man Switch activity.

**📁 Digital Document Storage**

- PDFs, images, legal documents, and certificates
- Encrypted file storage

**👥 Beneficiary Verification**

- Identity verification
- Multi-step beneficiary verification
- Verification links and confirmation workflows

**📧 Notification Improvements**

- Multiple warning stages and custom intervals
- SMS and push notifications
- Custom email templates

**⚖️ Legal Integration**

A future production version could explore integration with legally valid estate-planning workflows and professional legal services.

---

## Project Workflow

```text
                    User Registration
                           │
                           ▼
                      User Login
                           │
                           ▼
                  JWT Authentication
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
            Asset Vault          Nominees
                 │                   │
                 ▼                   ▼
          Encrypted Data      Beneficiary Data
                 │                   │
                 └─────────┬─────────┘
                           ▼
                     User Activity
                           │
                           ▼
                    Dead-Man Switch
                           │
                 ┌─────────┴─────────┐
              30 Days             60 Days
                 │                   │
                 ▼                   ▼
          Warning Email      Trigger Workflow
                                     │
                                     ▼
                            Nominee Notification
```

---

## Project Status

| Component            | Status       |
| -------------------- | ------------ |
| Frontend             | ✅ Completed |
| Backend              | ✅ Completed |
| Authentication       | ✅ Completed |
| Asset Management     | ✅ Completed |
| Asset Encryption     | ✅ Completed |
| Nominee Management   | ✅ Completed |
| Dead-Man Switch      | ✅ Completed |
| Email Notifications  | ✅ Completed |
| MongoDB Integration  | ✅ Completed |
| Cloud Deployment     | ✅ Completed |

---

## Learning Outcomes

This project demonstrates practical implementation of:

- Full-stack web development
- REST API development
- React component architecture
- Authentication and authorization
- JWT implementation
- Password hashing
- Application-level encryption
- MongoDB database design
- API security
- Middleware development
- Scheduled background jobs
- Email automation
- Environment configuration
- Cloud deployment
- Frontend/backend integration
- Git and GitHub workflow

---

## Academic Relevance

DigiWill combines multiple areas of computer science and software engineering:

- Web application development
- Database management
- Cybersecurity and cryptography
- Authentication
- Cloud deployment
- Software architecture and API design
- Automated background processing

The project shows how these technologies can be combined into a practical digital legacy management application.

---

## Disclaimer

DigiWill is an academic and software engineering project intended to demonstrate digital legacy management concepts.

It does not constitute a legally valid will, estate plan, financial service, legal service, or professional legal advice. Users should consult qualified legal professionals for legally enforceable estate planning.

---

## Author

**Amit Kumar Tripathi**
B.Tech — Computer Science Engineering
Oriental Institute of Science and Technology

This project was developed as a full-stack software engineering project to explore secure digital asset management, authentication, encryption, automated background processing, and cloud deployment.

---

## License

This project is intended primarily for educational and academic purposes.
