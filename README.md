🚀 MERN CRUD App - Frontend (React)

This is the frontend of the MERN (MongoDB, Express, React, Node.js) CRUD application. It interacts with the backend API to perform Create, Read, Update, and Delete operations and is deployed using AWS S3 with CI/CD via GitHub Actions.

🌐 Live Demo

Frontend Live URL - S3 Static Website

🎓 Features

User-friendly interface

Perform CRUD operations

Integrated with backend REST API

Responsive UI

🔧 Technologies Used

React.js

Axios

React Hooks

HTML/CSS

GitHub Actions (for CI/CD)

🔄 Folder Structure

frontend/
├── public/
├── src/
│   ├── components/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── README.md

🔧 Getting Started (Local Setup)

Clone the repository

git clone https://github.com/SumangalChhetri/mern-crud-frontend.git
cd mern-crud-frontend

Install dependencies

npm install

Start the development server

npm start

Make sure the backend server is running on the specified API URL (default: http://localhost:5000)

📁 Environment Variables

You can configure your API endpoint in the React app via:

// src/api.js
const API_URL = 'http://<your-ec2-public-ip>:5000/api/items';

🌌 Deployment (AWS S3)

1. Build your React app

npm run build

2. Configure S3 Bucket

Enable Static Website Hosting

Upload contents of /build folder

Set bucket policy and permissions

🚧 CI/CD Setup

GitHub Actions Workflow (.github/workflows/deploy-frontend.yml)

On every push to master, GitHub builds the React app and deploys it to S3.

Required Secrets in GitHub Repo:

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

AWS_REGION

S3_BUCKET_NAME

💸 Cost Optimization

Used S3 Free Tier static hosting

No EC2 required for frontend

Build artifacts optimized before deployment

👤 Author

Sumangal ChhetriGitHub: SumangalChhetri

🔒 License

This project is licensed under the MIT License.
