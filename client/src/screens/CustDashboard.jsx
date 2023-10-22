import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"

import { getAllQuerys, createNewQuery } from "../api"

const CustDashboard = () => {
	const [query, setQuery] = useState("")
	const [socket, setSocket] = useState(null)
	const { id } = useParams()

	const handleSubmit = async () => {
		// console.log(query)
		const data = await createNewQuery({
			customerId: id,
			agentId: null,
			priority: 1,
			query: query,
			conversation: [
				{
					text: query,
					sentBy: "customer"
				}
			]
		})
		// console.log(data)
		socket.emit("addNewQuery", data)
	}

	socket?.on("server", (msg) => console.log(msg))

	useEffect(() => {
		const s = io("http://localhost:5000/")
		// console.log("Hey", s.id)
		s.on("connect", () => console.log(s.id))
		s.emit("addUser", id)
		setSocket(s)
		return () => {
			s.disconnect()
		}
	}, [])

	return (
		<div>
			<Form>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Enter Query</Form.Label>
					<Form.Control
						onChange={(e) => setQuery(e.target.value)}
						as="textarea"
						rows={3}
					/>
				</Form.Group>
			</Form>
			<Button onClick={handleSubmit}>Submit</Button>
		</div>
	)
}

export default CustDashboard
