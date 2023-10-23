import React from "react"
import Toast from "react-bootstrap/Toast"

const Toast = ({ heading, msg, show, toggleShow }) => {
	return (
		<Toast show={show} onClose={toggleShow} className="toast">
			<Toast.Header>
				<strong className="me-auto">{heading}</strong>
			</Toast.Header>
			<Toast.Body>{msg}</Toast.Body>
		</Toast>
	)
}

export default Toast
