import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { getAllAgents, createNewAgent } from "../api"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const AgentLogin = () => {
	const [screen, setScreen] = useState(0)
	const [agentList, setAgentList] = useState([])
	const [agentId, setAgentId] = useState(null)
	const [socket, setSocket] = useState(null)
	const [newAgentData, setNewAgentData] = useState({
		email: "",
		name: ""
	})
	const navigate = useNavigate()

	useEffect(() => {
		const getAgentsList = async () => {
			const data = await getAllAgents()
			console.log(data)
			setAgentList(data)
		}
		getAgentsList()
	}, [])

	const login = () => {
		localStorage.setItem("agent", agentId)
		navigate(`/agent-dashboard/${agentId}`)
	}

	const handleSubmit = async () => {
		console.log(newAgentData)
		const data = await createNewAgent(newAgentData)
		console.log(data)
		localStorage.setItem("agent", data.agentId)
		navigate(`/agent-dashboard/${agentId}`)
	}

	return (
		<div>
			{screen === 0 ? (
				<>
					<Form.Select onChange={(e) => setAgentId(e.target.value)}>
						<option>Select Agent</option>
						{agentList.map((agent) => (
							<option value={agent.agentId}>{agent.email}</option>
						))}
					</Form.Select>
					<p>
						New User ? <b onClick={() => setScreen(1)}>Click Here</b>
					</p>
					<Button onClick={login}>Proceed</Button>
				</>
			) : (
				<>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								onChange={(e) =>
									setNewAgentData({ ...newAgentData, email: e.target.value })
								}
								type="email"
								placeholder="name@example.com"
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Name</Form.Label>
							<Form.Control
								onChange={(e) =>
									setNewAgentData({ ...newAgentData, name: e.target.value })
								}
								type="text"
								placeholder="name"
							/>
							<Button onClick={handleSubmit}>Submit</Button>
						</Form.Group>
						<p>
							Existing User ? <b onClick={() => setScreen(0)}>Click Here</b>
						</p>
					</Form>
				</>
			)}
		</div>
	)
}

export default AgentLogin