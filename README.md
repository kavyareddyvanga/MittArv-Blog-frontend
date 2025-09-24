# Blogs – Frontend

🚀 Live Demo: [https://mitt-arv-blog-frontend.vercel.app/](https://mitt-arv-blog-frontend.vercel.app/)
🛠️ Live API (Backend): [https://your-backend-url.com](https://backend-mittarv.onrender.com/api)

Frontend of the Blogs Platform built with **React, SCSS, and Axios**.  
Handles the user interface, blog viewing, and interaction with the backend API.

## Repositories
- **Frontend:** [Blog Frontend Repository](https://github.com/your-username/blog-frontend-repo)
- **Backend:** [Blog Backend Repository](https://github.com/your-username/blog-backend-repo)

---

## Features
- Signup/Login with JWT authentication
- View all blogs or individual posts
- Create, edit, delete own posts
- Upload images via Cloudinary
- "My Posts" page for authored blogs
- Responsive UI for desktop and mobile

---

## Tech Stack
- React
- SCSS
- React Router
- Axios

---

## Setup & Run

1. Install dependencies:
```bash
cd frontend
npm install
Start development server:

bash
Copy code
npm run dev
Open in browser: http://localhost:5173 (or your desired port)

Configure API endpoint in axios.js:

javascript
Copy code
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // or production backend URL
  withCredentials: true
});

export default api;
Project Structure
plaintext
Copy code
frontend/
├── public/                   # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   ├── pages/                # Page components
│   ├── context/              # State management
│   ├── axios.js              # Axios instance for API calls
│   └── App.jsx               # Main React app
├── package.json
└── README.md
Usage
Sign up or log in

Browse blogs or navigate to individual posts

Create, edit, or delete your posts

Upload images with blog posts

Access “My Posts” for authored content

Deployment
Frontend hosted on Vercel

Build the project:

bash
Copy code
npm run build
Set environment variable in Vercel dashboard:

ini
Copy code
VITE_API_URL=https://backend-mittarv.onrender.com/api
