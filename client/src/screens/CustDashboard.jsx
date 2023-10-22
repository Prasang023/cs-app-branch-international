import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import Modal from "react-bootstrap/Modal"

import { getAllQuerys, createNewQuery, getQuerysByCustomerId } from "../api"

const CustDashboard = () => {
	const [query, setQuery] = useState("")
	const [socket, setSocket] = useState(null)
	const [myQuerys, setMyQuerys] = useState(null)
	const [selectedChat, setSelectedChat] = useState(null)
	const [msg, setMsg] = useState("")
	const { id } = useParams()
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

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
        handleClose()
        getMyQuerys()
		// console.log(data)
		socket.emit("addNewQuery", data)
	}

	// socket?.on("server", (msg) => console.log(msg))

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

    const getMyQuerys = async () => {
        const data = await getQuerysByCustomerId(id)
        console.log(data)
        setMyQuerys(data)
    }

	useEffect(() => {
		getMyQuerys()
	}, [])

	const handleSend = () => {
		console.log(msg)
	}

	return (
		<div>
			{/*
			 */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Query</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Enter Query</Form.Label>
							<Form.Control
								onChange={(e) => setQuery(e.target.value)}
								as="textarea"
								rows={3}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button onClick={handleSubmit}>Submit</Button>
				</Modal.Footer>
			</Modal>
			<div className="chat-outer-container">
				<div className="left-panel">
					<div className="left-top-navbar">
						<h6>{id}</h6>
						<Button variant="primary" onClick={handleShow}>
							Create New Query
						</Button>
					</div>
					<div className="left-panel-section">
						<h5>My Queries</h5>
						{myQuerys?.map((query) => (
							<div
								className="query-thumbnail"
								onClick={() => setSelectedChat(query)}
							>
								<div className="query-thumbnail-topline">
									<p className="query-customer-details">
										{query.agentId ? query.agentId : "No agent alloted yet."}
									</p>
								</div>
								<p className="query-msg-details">
									<b>{query.query}</b>
								</p>
								<p className="query-thumbnail-topline">
									Date: {query.createdAt.substring(0, 10)},{" "}
									{query.createdAt.substring(16, 5)}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="right-panel">
					{selectedChat ? (
						<div>
							{selectedChat.conversation.map((chat) => (
								<div
									className={
										chat.sentBy === "agent" ? "chatToLeft" : "chatToRight"
									}
								>
									<p
										className={
											chat.sentBy === "agent" ? "chattextleft" : "chattextright"
										}
									>
										{chat.text}
									</p>
								</div>
							))}
						</div>
					) : (
						<div>No Chat Selected</div>
					)}
					<div className="send-msg-area">
						<Form>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Control
									onChange={(e) => setMsg(e.target.value)}
									type="text"
									placeholder="Type Message Here"
								/>
							</Form.Group>
						</Form>
						<Button type="submit" onClick={handleSend}>
							Send
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CustDashboard
