import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Toast from "react-bootstrap/Toast"

import AgentLogin from "../components/AgentLogin"
import CustomerLogin from "../components/CustomerLogin"
import logo from "../assets/R.png"

const Home = () => {
	const [role, setRole] = useState(0)
	const [showA, setShowA] = useState(false)

	const toggleShowA = () => setShowA(!showA)
	const handleClick = (e) => {
		console.log("clicked")
		console.log(e.target.value)
		setRole(Number(e.target.value))
	}

	return (
		<div className="home-screen">
			<Toast show={showA} onClose={toggleShowA} className="toast">
				<Toast.Header>
					{/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
					<strong className="me-auto">Success</strong>
				</Toast.Header>
				<Toast.Body>User Created! You can go to login now</Toast.Body>
			</Toast>
			<div className="container-home">
				<div>
					<img src={logo} alt="logo" width="250px" height="180px" />
				</div>
				<div className="bottom-container">
					<ButtonGroup onClick={handleClick} className="bgrp">
						<Button value={0} variant={role === 0 ? "primary" : "secondary"}>
							Agent
						</Button>
						<Button value={1} variant={role === 1 ? "primary" : "secondary"}>
							Customer
						</Button>
					</ButtonGroup>
				</div>
				<div>
					{role === 0 ? (
						<AgentLogin toggleShowA={toggleShowA} />
					) : (
						<CustomerLogin toggleShowA={toggleShowA} />
					)}
				</div>
			</div>
		</div>
	)
}

export default Home
