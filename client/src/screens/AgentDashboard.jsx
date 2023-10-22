import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import { getUnallotedQuerys, getAllotedQuerys } from "../api"

import Badge from "react-bootstrap/Badge"

const AgentDashboard = () => {
	const [socket, setSocket] = useState(null)
	const { id } = useParams()
	const [unallotedQuery, setUnallotedQuery] = useState(null)
	const [allotedQuery, setAllotedQuery] = useState(null)
	const [selectedChat, setSelectedChat] = useState(null)
    const [msg, setMsg] = useState("")

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
		getQueries()
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
		console.log(unallotedQueryData, allotedQueryData)
	}

	useEffect(() => {
		getQueries()
	}, [])

    const handleSend = () => {
        console.log(msg)
    }

	return (
		<div className="chat-outer-container">
			<div className="left-panel">
				<div className="left-top-navbar">{id}</div>
				<div className="left-panel-section">
					<h5>Unalloted Queries</h5>
					{unallotedQuery?.map((query) => (
						<div
							className="query-thumbnail"
							onClick={() => setSelectedChat(query)}
						>
							<div className="query-thumbnail-topline">
								<p className="query-customer-details">{query.customerId}</p>
								<Badge bg={query.priority === 0 ? "danger" : "info"}>
									{query.priority === 0
										? `p : ${query.priority} : urgent`
										: `p : ${query.priority}`}
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
				<div className="left-panel-section">
					<h5>Alloted Queries</h5>
					{allotedQuery?.map((query) => (
						<div>{query.query}</div>
					))}
				</div>
			</div>
			<div className="right-panel">
				{selectedChat ? (
					<div>
						{selectedChat.conversation.map((chat) => (
							<div
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
	)
}

export default AgentDashboard
