import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import Modal from "react-bootstrap/Modal"
import priorityData from "../assets/priority.json"

import { createNewQuery, getQuerysByCustomerId, getCustomerById } from "../api"

const CustDashboard = () => {
	const [query, setQuery] = useState("")
	const [socket, setSocket] = useState(null)
	const [myQuerys, setMyQuerys] = useState(null)
	const [selectedChat, setSelectedChat] = useState(null)
	const [msg, setMsg] = useState("")
	const { id } = useParams()
	const [show, setShow] = useState(false)
	const [conversation, setConversation] = useState([])
	const [userDetails, setUserDetails] = useState(null)
	const [queryCategory, setQueryCategory] = useState("")

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const handleSubmit = async () => {
		console.log(priorityData)
		let priority = 2
		let keys = Object.keys(priorityData)
		for (let i = 0; i < keys.length; i++) {
			if (priorityData[keys[i]].indexOf(queryCategory) > -1) {
				priority = Number(i)
				break
			}
		}
		const data = await createNewQuery({
			customerId: id,
			agentId: null,
			priority: priority,
			query: query,
			category: queryCategory,
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
		const getUserDetails = async () => {
			const data = await getCustomerById(id)
			setUserDetails(data[0])
		}
		getUserDetails()
	}, [])

	const handleSend = () => {
		if (!msg || msg === "") return
		setMsg("")
		setConversation([...conversation, { text: msg, sentBy: "customer" }])
		socket.emit("sendMsg", {
			senderId: id,
			receiverId: selectedChat.agentId,
			msg: msg
		})
	}

	const handleSelectedChat = (query) => {
		setSelectedChat(query)
		setConversation([])
		getQueries()
	}

	socket?.on("updateAfterAllotment", () => {
		getMyQuerys()
		handleSelectedChat(null)
	})

	socket?.on("getMsg", ({ msg }) => {
		console.log("triggered")
		setConversation([...conversation, { text: msg, sentBy: "agent" }])
	})

	const handleResolve = () => {}

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Query</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Select
							className="mb-3"
							onChange={(e) => setQueryCategory(e.target.value)}
						>
							<option value="">Select Category</option>
							<option value="loan">Loans</option>
							<option value="transaction">Transaction</option>
							<option value="account">Account</option>
							<option value="general">General</option>
						</Form.Select>
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
						<h5>
							{id} - {userDetails?.name} - {userDetails?.email}
						</h5>
						<Button variant="secondary" onClick={handleShow}>
							Create New Query
						</Button>
					</div>
					<div className="left-panel-section">
						<h5>My Queries</h5>
						{myQuerys?.map((query) => (
							<div
								key={query._id}
								className="query-thumbnail"
								onClick={() => handleSelectedChat(query)}
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
						<div className="chat-container">
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
							{conversation?.map((chat) => (
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
					{selectedChat ? (
						<div className="send-msg-area">
							<Form>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Control
										value={msg}
										disabled={
											!selectedChat?.agentId || selectedChat?.isResolved
										}
										onChange={(e) => setMsg(e.target.value)}
										type="text"
										placeholder="Type Message Here"
									/>
								</Form.Group>
							</Form>
							<Button
								type="submit"
								onClick={handleSend}
								disabled={!selectedChat?.agentId || selectedChat?.isResolved}
							>
								Send
							</Button>
							<Button
								type="submit"
								onClick={handleResolve}
								disabled={!selectedChat?.agentId || selectedChat?.isResolved}
							>
								Mark as Resolved
							</Button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default CustDashboard
