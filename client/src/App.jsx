import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./screens/Home"
import CustDashboard from "./screens/CustDashboard"

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
			<Routes>
				<Route path="/customer-dashboard/:id" element={<CustDashboard />} />
			</Routes>
		</>
	)
}

export default App
