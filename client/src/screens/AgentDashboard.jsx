import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import {
	getUnallotedQuerys,
	getAllotedQuerys,
	allotQuery,
	updateConversation,
	getAgentById,
	getAllCustomers
} from "../api"
import Modal from "react-bootstrap/Modal"

import Badge from "react-bootstrap/Badge"

const AgentDashboard = () => {
	const [socket, setSocket] = useState(null)
	const { id } = useParams()
	const [unallotedQuery, setUnallotedQuery] = useState(null)
	const [allotedQuery, setAllotedQuery] = useState(null)
	const [selectedChat, setSelectedChat] = useState(null)
	const [msg, setMsg] = useState("")
	const [conversation, setConversation] = useState([])
	const [userDetails, setUserDetails] = useState(null)
	const [show, setShow] = useState(false)
	const [allCustomers, setAllCustomers] = useState(null)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	useEffect(() => {
		const s = io("http://localhost:5000/")
		s.on("connect", () => console.log(s.id))
		s.emit("addUser", id)
		setSocket(s)

		return () => {
			s.disconnect()
		}
	}, [])

	socket?.on("getNewQuery", (obj) => {
		console.log("new query got", obj)
		getQueries()
	})

	socket?.on("updateAfterAllotment", () => {
		getQueries()
		handleSelectedChat(null)
	})

	socket?.on("getMsg", ({ msg }) => {
		console.log("triggered")
		setConversation([...conversation, { text: msg, sentBy: "customer" }])
	})

	const getQueries = async () => {
		const unallotedQueryData = await getUnallotedQuerys()
		const allotedQueryData = await getAllotedQuerys(id)
		unallotedQueryData.sort(
			(a, b) => parseInt(a.priority) - parseInt(b.priority)
		)
		allotedQueryData.sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
		setUnallotedQuery(unallotedQueryData)
		setAllotedQuery(allotedQueryData)
		// console.log(unallotedQueryData, allotedQueryData)
	}

	useEffect(() => {
		getQueries()
		const getUserDetails = async () => {
			const data = await getAgentById(id)
			setUserDetails(data[0])
		}
		getUserDetails()
		// getAllCustomers()
	}, [userDetails])

	// console.log(allCustomers)

	const handleSend = () => {
		if (!msg || msg === "") return
		setConversation([...conversation, { text: msg, sentBy: "agent" }])
		console.log("Printeing id", socket.id)
		socket.emit("sendMsg", {
			senderId: id,
			receiverId: selectedChat.customerId,
			msg: msg
		})
		setMsg("")
	}

	const handleAllotment = async () => {
		console.log(selectedChat)
		const data = await allotQuery(selectedChat._id, id)
		socket.emit("allotment")
		console.log(data)
		handleClose()
	}

	const handleSelectedChat = async (query) => {
		if (conversation.length > 0) {
			await updateConversation(selectedChat._id, conversation)
		}
		setSelectedChat(query)
		setConversation([])
		getQueries()
	}

	// console.log("userDetails", userDetails)

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Query</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to allot this query to yourself?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button onClick={handleAllotment}>Submit</Button>
				</Modal.Footer>
			</Modal>
			<div className="chat-outer-container">
				<div className="left-panel">
					<div className="left-top-navbar">
						{id} - {userDetails?.name} - {userDetails?.email}
					</div>
					<h5 className="heading-section">Unalloted Queries</h5>
					<div className="left-panel-section">
						{unallotedQuery?.map((query) => (
							<div
								className="query-thumbnail"
								onClick={() => handleSelectedChat(query)}
								key={query._id}
							>
								<div className="query-thumbnail-topline">
									<p className="query-customer-details">
										<b>Customer id: </b>
										{query.customerId}
									</p>
									<Badge
										bg={
											query.priority === 0
												? "danger"
												: query.priority === 1
												? "warning"
												: "info"
										}
									>
										{query.priority === 0
											? `p : ${query.priority} : urgent`
											: query.priority === 1
											? `p : ${query.priority} : important`
											: `p : ${query.priority} : normal`}
									</Badge>
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
					<h5 className="heading-section">Alloted Queries</h5>
					<div className="left-panel-section">
						{allotedQuery?.map((query) => (
							<div
								key={query._id}
								className="query-thumbnail"
								onClick={() => handleSelectedChat(query)}
							>
								<div className="query-thumbnail-topline">
									<p className="query-customer-details">
										<b>Customer id: </b>
										{query.customerId}
									</p>
									<div>
										<Badge
											style={{ marginRight: "10px" }}
											bg={query.isResolved ? "success" : "warning"}
										>
											{query.isResolved ? "Resolved" : "Unresolved"}
										</Badge>
										<Badge
											bg={
												query.priority === 0
													? "danger"
													: query.priority === 1
													? "warning"
													: "info"
											}
										>
											{query.priority === 0
												? `p : ${query.priority} : urgent`
												: `p : ${query.priority}`}
										</Badge>
									</div>
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
									key={chat._id}
									className={
										chat.sentBy === "customer" ? "chatToLeft" : "chatToRight"
									}
								>
									<p
										className={
											chat.sentBy === "customer"
												? "chattextleft"
												: "chattextright"
										}
									>
										{chat.text}
									</p>
								</div>
							))}
							{conversation?.map((chat, i) => (
								<div
									key={chat.text + i}
									className={
										chat.sentBy === "customer" ? "chatToLeft" : "chatToRight"
									}
								>
									<p
										className={
											chat.sentBy === "customer"
												? "chattextleft"
												: "chattextright"
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
										disabled={!selectedChat?.agentId}
										onChange={(e) => setMsg(e.target.value)}
										type="text"
										placeholder="Type Message Here"
									/>
								</Form.Group>
							</Form>
							<Button
								type="submit"
								onClick={selectedChat?.agentId ? handleSend : handleShow}
							>
								{selectedChat?.agentId ? "Send" : "Take this query"}
							</Button>
						</div>
					) : null}
				</div>
			</div>
		</>
	)
}

export default AgentDashboard
