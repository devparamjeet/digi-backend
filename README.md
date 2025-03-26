# DigiLocker API

A secure document storage and sharing API built with **Node.js, Express.js, and MongoDB**.

## Features
- **User Authentication** (Register & Login using JWT)
- **Secure Document Upload** (via Multer)
- **User-Specific Document Access**
- **Document Sharing with Other Users**
- **MongoDB for Data Storage**

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **File Upload:** Multer
- **Server Management:** Nodemon, Morgan

---

## 📂 Project Structure
```
digilocker-api/
│── src/
│   ├── config/          # Database and environment config
│   ├── controllers/     # Route controllers (business logic)
│   ├── middleware/      # Authentication and file upload middleware
│   ├── models/          # Mongoose models (User, Document)
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
cd digi-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
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

## 📜 License
This project is **open-source** and available under the **MIT License**.

---

## 📞 Contact
For any issues, feel free to reach out:
- **Email:** officialshadowx14@gmail.com
- **GitHub Issues:** [Open an Issue](https://github.com/devparamjeet/digi-backend/issues)

