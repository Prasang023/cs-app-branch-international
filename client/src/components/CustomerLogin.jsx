import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { getAllCustomers, createNewCustomer } from "../api"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const CustomerLogin = () => {
	const [screen, setScreen] = useState(0)
	const [customerList, setCustomerList] = useState([])
	const [customerId, setCustomerId] = useState(null)
	const [newCustomerData, setNewCustomerData] = useState({
		email: "",
		name: ""
	})
	const navigate = useNavigate()

	useEffect(() => {
		const getCustomersList = async () => {
			const data = await getAllCustomers()
			console.log(data)
			setCustomerList(data)
		}
		getCustomersList()
	}, [])

	const login = () => {
		// localStorage.setItem("customer", customerId)
		navigate(`/customer-dashboard/${customerId}`)
	}

	const handleSubmit = async () => {
		console.log(newCustomerData)
		const data = await createNewCustomer(newCustomerData)
		console.log(data)
		// localStorage.setItem("customer", data.customerId)
    navigate(`/customer-dashboard/${customerId}`)
	}

	return (
		<div>
			{screen === 0 ? (
				<>
					<Form.Select onChange={(e) => setCustomerId(e.target.value)}>
						<option>Select Customer</option>
						{customerList.map((customer) => (
							<option value={customer.customerId}>{customer.email}</option>
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
									setNewCustomerData({
										...newCustomerData,
										email: e.target.value
									})
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
									setNewCustomerData({
										...newCustomerData,
										name: e.target.value
									})
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

export default CustomerLogin