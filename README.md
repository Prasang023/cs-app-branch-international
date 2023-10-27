# cs-app-branch-international

This is a Customer Support web application that is used to solve queries of customers.

### Steps to setup project locally

Prerequisites
- node
- npm

Step 1: Clone the repository to local machine
```
git clone https://github.com/Prasang023/cs-app-branch-international.git
```

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

### App Design

The webapp consists of two major sections, customer dashboard and agent dashboard, both for the respective users.

Customer Interface: Customer can create a query, mentioning a initial quetion for the agent to solve and then use the chat interface of the app to commuicate with the agent in real-time helping in query resolution.

Agent Interface: Agent can create assign a particular query to itself and then use the chat interface of the app to commuicate with the customer in real-time helping in query resolution. Assign-and-solve method helps in working of multiple agents on the platform simultaneously since unassigned agents won't be able to message on a query and no two agents can be assigned to a particular query.

### Features Implemented
- Division of work between agents: An effective method to devide queries among the agents before help them communicate with the customers using assign-and-solve method.
- Prioritizing the queries: Customers select category of the query at the time of creatiion that helps in priioritizing the qeries into three departments: "urgent", "important", and "normal"
- Display information about Customers: Additional information about the customers that created the query is visible on the query thumbnail to improve the user experience of agents
- Canned Messages: Implemented canned messages for each query based on the different categories that can ease the process of query resolution for the agents.
- Websocket: Used Socket.io for real-time commuication between agents and customers as well as saving a backup of the query on the database.

### Techstack Used
Frontend: ReactJs, Javascript, HTML, CSS
Backend: Socket.io, nodeJs, MongoDB
