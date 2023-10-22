import { Route, Routes } from "react-router-dom"
import "./App.css"
import "./styles/home.css"
import "./styles/agentDashboard.css"
import Home from "./screens/Home"
import CustDashboard from "./screens/CustDashboard"
import AgentDashboard from "./screens/AgentDashboard"

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
			<Routes>
				<Route path="/customer-dashboard/:id" element={<CustDashboard />} />
			</Routes>
			<Routes>
				<Route path="/agent-dashboard/:id" element={<AgentDashboard />} />
			</Routes>
		</>
	)
}

export default App
