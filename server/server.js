const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")

const agentRoutes = require("./routes/agentRoutes")
const customerRoutes = require("./routes/customerRoutes")
const queryRoutes = require("./routes/queryRoutes")

dotenv.config()
const app = express()

const http = require("http").Server(app)
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"]
	}
})
require("./socket")(io)
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
connectDB()

app.use("/api/agents", agentRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/querys", queryRoutes)

app.get("/", (req, res) => {
	res.send("API server is running")
})

const PORT = process.env.PORT || 5000

http.listen(PORT, () => {
	console.log(
		`server is running & listening on port : ${process.env.PORT || 5000}`
	)
})
