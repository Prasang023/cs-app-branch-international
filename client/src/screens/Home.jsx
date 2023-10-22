import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"

import AgentLogin from "../components/AgentLogin"
import CustomerLogin from "../components/CustomerLogin"

const Home = () => {
	const [role, setRole] = useState(0)
	const handleClick = (e) => {
		console.log("clicked")
		console.log(e.target.value)
		setRole(Number(e.target.value))
	}

	return (
		<div>
			<div>
				<img src="" alt="logo" />
			</div>
			<div>
				<ButtonGroup onClick={handleClick}>
					<Button value={0} varient="primary">
						Agent
					</Button>
					<Button value={1} varient="primary">
						Customer
					</Button>
				</ButtonGroup>
			</div>
			<div>{role === 0 ? <AgentLogin /> : <CustomerLogin />}</div>
		</div>
	)
}

export default Home
