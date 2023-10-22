import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"

import AgentLogin from "../components/AgentLogin"
import CustomerLogin from "../components/CustomerLogin"
import logo from "../assets/R.png"

const Home = () => {
	const [role, setRole] = useState(0)
	const handleClick = (e) => {
		console.log("clicked")
		console.log(e.target.value)
		setRole(Number(e.target.value))
	}

	return (
		<div className="home-screen">
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
				<div>{role === 0 ? <AgentLogin /> : <CustomerLogin />}</div>
			</div>
		</div>
	)
}

export default Home
