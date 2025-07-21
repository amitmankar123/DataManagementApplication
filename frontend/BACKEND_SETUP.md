# Backend Setup Guide

## 🚨 Current Issue
The React app is trying to connect to backend APIs that don't exist yet. You need to set up a backend server to handle the API requests.

## 🔧 Backend Options

### Option 1: Express.js Backend (Recommended)

Create a new folder called `backend` and set up an Express.js server:

```bash
mkdir backend
cd backend
npm init -y
npm install express cors multer mongoose
```

**Basic Express.js Server Structure:**
```javascript
// backend/server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
app.post('/api/projects/createProject', upload.single('image'), (req, res) => {
  // Handle project creation
  res.json({ message: 'Project created successfully' });
});

app.get('/api/projects/getProjects', (req, res) => {
  // Return projects data
  res.json([]);
});

// Add other routes...

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Option 2: Use a Mock Server

Install `json-server` for quick API mocking:

```bash
npm install -g json-server
```

Create `db.json`:
```json
{
  "projects": [],
  "clients": [],
  "contacts": [],
  "subscribers": []
}
```

Run the mock server:
```bash
json-server --watch db.json --port 5000
```

### Option 3: Update API Base URL

If your backend runs on a different port, update the axios configuration:

```javascript
// In your React components, update axios calls:
axios.defaults.baseURL = 'http://localhost:5000';
```

## 📋 Required API Endpoints

Your backend needs to implement these endpoints:

### Projects
- `POST /api/projects/createProject` - Create project with image upload
- `GET /api/projects/getProjects` - Get all projects

### Clients  
- `POST /api/clients/createClient` - Create client with image upload
- `GET /api/clients/getClients` - Get all clients

### Contact Forms
- `POST /api/contact/createContactForm` - Submit contact form
- `GET /api/contact/getContactForm` - Get all contacts

### Newsletter
- `POST /api/subscribe/createSubscriber` - Subscribe to newsletter
- `GET /api/subscribe/getsubscriber` - Get all subscribers

## 🚀 Quick Start

1. **Set up your backend server**
2. **Ensure it runs on port 5000** (or update axios base URL)
3. **Start your React app**: `npm start`
4. **Test the APIs** using Postman or similar tool

## 🔍 Testing APIs

Use tools like Postman or curl to test your endpoints:

```bash
# Test GET request
curl http://localhost:5000/api/projects/getProjects

# Test POST request
curl -X POST http://localhost:5000/api/contact/createContactForm \
  -H "Content-Type: application/json" \
  -d '{"Full_Name":"Test","email":"test@example.com","Mobile_Number":"1234567890","City":"Test City"}'
```

## 📝 Next Steps

1. Set up your preferred backend solution
2. Implement the required API endpoints
3. Test the connection between frontend and backend
4. Add database integration (MongoDB, PostgreSQL, etc.)
5. Add authentication and authorization
6. Deploy both frontend and backend

The React app will work perfectly once you have a backend server running and responding to the API requests! 