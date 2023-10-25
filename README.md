# cs-app-branch-international

This is a Customer Support web application that is used to solve queries of customers.

## Steps to setup project locally

Prerequisites
- node
- npm

Step 1: Clone the repository to local machine
`git clone https://github.com/Prasang023/cs-app-branch-international.git`

Step 2: Move to server directory and create `.env` file
```
cd server
```
Rename `.env.sample` file to `.env` and add your mongoDB database URL to connect with the app

Step 3: Install dependencies inside server directory and start the server
```
npm install
npm start
```

The server will start running of port 5000

Step 4: Move to client directory, install dependencies and run the client
```
cd client
npm install
npm run dev
```
This will start the frontend on port 5173. Now open `http://localhost:5173` and use the app.

