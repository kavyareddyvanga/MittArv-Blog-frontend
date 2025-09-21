Blogs – Frontend

🚀 Live Demo - https://mitt-arv-blog-frontend.vercel.app/

Frontend of the Blogs Platform built with React, SCSS, and Axios.
Handles the user interface, blog viewing, and interaction with the backend API.

Features:
Signup/Login with JWT authentication
View all blogs or individual posts
Create, edit, delete own posts
Upload images via Cloudinary
"My Posts" page for authored blogs
Responsive UI for desktop and mobile

Tech Stack:
React
SCSS
React Router
Axios

Setup & Run:
Install dependencies:
cd frontend
npm install
Start development server:
npm run dev
Open in browser: http://localhost:5173 //or your desired port

Configure API endpoint in axios.js:
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api", // or production backend URL
  withCredentials: true
});
export default api;


Project Structure
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

Usage:
Sign up or log in
Browse blogs or navigate to individual posts
Create, edit, or delete your posts
Upload images with blog posts
Access “My Posts” for authored content

Deployment:
Frontend hosted on Vercel

Build the project:
npm run build

Set environment variable in Vercel dashboard:
VITE_API_URL=https://backend-mittarv.onrender.com/api 
