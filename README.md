# DigiLocker API

A secure document storage and sharing API built with **Node.js, Express.js, and MongoDB**.

## Problem Statement
**Land ownership disputes** arise due to fraudulent records, missing documents, and lack of accessibility. Current digital land record systems are not tamper-proof and prone to manipulation.

## Solution
Build a **web-based digital land record system** with the following key features:

- **Tamper-Proof Document Storage** using hash verification (without blockchain).
- **Seamless Online Land Registration & Mutation Processing** for ownership transfer.
- **Geospatial Mapping of Land Parcels** for real-time visualization of ownership.
- **User Authentication via Aadhaar / e-KYC** to prevent impersonation.
- **Secure Online Verification** for banks & loan agencies to reduce fraud in land mortgage processes.

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token), Aadhaar/e-KYC
- **File Upload & Verification:** Multer, Hash Verification
- **Geospatial Mapping:** GIS Integration
- **Server Management:** Nodemon, Morgan

---

## 📂 Project Structure
```
digilocker-api/
│── src/
│   ├── config/          # Database and environment config
│   ├── controllers/     # Route controllers (business logic)
│   ├── middleware/      # Authentication and file upload middleware
│   ├── models/          # Mongoose models (User, Document, Land Parcels)
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── app.js           # Express app setup
│── uploads/             # Uploaded documents
│── .env                 # Environment variables
│── server.js            # Entry point
│── package.json         # Dependencies & scripts
│── README.md            # API Documentation
```

---

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/devparamjeet/digi-backend.git
cd digilocker-api
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### Download MongoDB Community Server to Run on Localhost
```sh
https://www.mongodb.com/try/download/community
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/digilocker
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Start the Server
```sh
npm run dev
```

---

## 📌 API Endpoints

### 🔹 User Authentication
| Method | Endpoint         | Description        |
|--------|----------------|--------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login & get JWT token |

### 🔹 Documents
| Method | Endpoint         | Description        |
|--------|----------------|--------------------|
| POST   | `/api/documents/upload` | Upload a document (Auth required) |
| GET    | `/api/documents/`       | Get user documents (Auth required) |

---

# Digital Land Record System API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## **1. User Authentication**

### **Register User**
**Endpoint:** `POST http://localhost:5000/api/auth/register`

**Input:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "aadhaar": "123456789012"
}
```

**Output:**
```json
{
  "message": "User registered successfully"
}
```

### **Login User**
**Endpoint:** `POST http://localhost:5000/api/auth/login`

**Input:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Output:**
```json
{
  "token": "jwt_token_here"
}
```

---

## **2. Vendor Authentication**

### **Register Vendor**
**Endpoint:** `POST http://localhost:5000/api/vendors/register`

**Input:**
```json
{
  "name": "Vendor Name",
  "email": "vendor@example.com",
  "password": "securepassword",
  "contactNumber": "1234567890",
  "company": "Land Survey Co.",
  "services": ["Surveying", "Legal Consulting"]
}
```

**Output:**
```json
{
  "message": "Vendor registered successfully"
}
```

### **Login Vendor**
**Endpoint:** `POST http://localhost:5000/api/vendors/login`

**Input:**
```json
{
  "email": "vendor@example.com",
  "password": "securepassword"
}
```

**Output:**
```json
{
  "token": "vendor_jwt_token_here"
}
```

---

## **3. Land Records**

### **Add Land Record (Only Vendor)**
**Endpoint:** `POST http://localhost:5000/api/lands/add`

**Headers:**
```
Authorization: Bearer vendor_jwt_token_here
```

**Input:**
```json
{
  "location": "Sector 15, Noida, India",
  "area": 1200
}
```

**Output:**
```json
{
  "message": "Land record added successfully",
  "landRecord": {
    "_id": "65f234abcd56789ef1234567",
    "location": "Sector 15, Noida, India",
    "area": 1200
  }
}
```

### **Get All Land Records**
**Endpoint:** `GET http://localhost:5000/api/lands`

**Output:**
```json
[
  {
    "_id": "65f234abcd56789ef1234567",
    "location": "Sector 15, Noida, India",
    "area": 1200
  }
]
```

### **Get Single Land Record**
**Endpoint:** `GET http://localhost:5000/api/lands/:id`

**Output:**
```json
{
  "_id": "65f234abcd56789ef1234567",
  "location": "Sector 15, Noida, India",
  "area": 1200
}
```

---

## **4. Document Upload**

### **Upload Document (Only Vendor)**
**Endpoint:** `POST http://localhost:5000/api/documents/upload`

**Headers:**
```
Authorization: Bearer vendor_jwt_token_here
```

**Form Data:**
```
file: (Upload File)
landRecordId: 65f234abcd56789ef1234567
documentType: Ownership Proof
```

**Output:**
```json
{
  "message": "Document uploaded successfully",
  "document": {
    "_id": "651234doc56789ef",
    "landRecord": "65f234abcd56789ef1234567",
    "documentType": "Ownership Proof",
    "documentUrl": "/uploads/documents/document.pdf"
  }
}
```

### **Get Documents for a Land Record**
**Endpoint:** `GET http://localhost:5000/api/documents/:landRecordId`

**Output:**
```json
[
  {
    "_id": "651234doc56789ef",
    "landRecord": "65f234abcd56789ef1234567",
    "documentType": "Ownership Proof",
    "documentUrl": "/uploads/documents/document.pdf"
  }
]
```

---

### **Notes:**
- Replace `localhost:5000` with the actual API server when deployed.
- Ensure vendors and users are authenticated before making certain requests.
- All `_id` values should be **MongoDB ObjectIds** (24-character hexadecimal).

---

## 🛠 Running in Production
For production, run:
```sh
npm start
```

You should also use **PM2** for process management:
```sh
npm install -g pm2
pm2 start server.js --name digilocker-api
```

---

## 🔒 Security Best Practices
- Use **HTTPS** in production
- Store **JWT Secret** securely (e.g., in **.env**)
- Validate **file uploads** to prevent malicious files

---

## 🤝 Contributing
Feel free to **fork** this repository and submit PRs. For major changes, please open an issue first.

---

## 📞 Contact
For any issues, feel free to reach out:
- **Email:** officialshadowx14@gmail.com
- **GitHub Issues:** [Open an Issue](https://github.com/devparamjeet/digi-backend/issues)

