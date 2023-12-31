let users = []

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId })
}

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId)
}

const getAgents = () => {
	return users.filter((user) => {
		if (user.userId != null) {
			return user.userId.includes("A")
		}
	})
}

const getUser = (userId) => {
	return users.find((user) => user.userId === userId)
}

module.exports = function (io) {
	io.on("connection", function (socket) {
		console.log("socket connected", socket.id)

		socket.on("query", (msg) => {
			console.log(msg)
			io.emit("server", "msg from server")
		})

		socket.on("allotment", () => {
			io.emit("updateAfterAllotment")
		})

		socket.on("addUser", (userId) => {
			console.log(userId, socket.id)
			addUser(userId, socket.id)
			io.emit("getUsers", users)
			console.log(users)
		})

		socket.on("disconnect", () => {
			console.log("a user disconnected!")
			removeUser(socket.id)
			io.emit("getUsers", users)
		})

		socket.on("addNewQuery", (obj) => {
			const agents = getAgents()
			console.log(agents, obj)
			agents.forEach((user) => {
				console.log(user, obj)
				io.to(user.socketId).emit("getNewQuery", obj)
			})
		})

		socket.on("sendMsg", ({ senderId, receiverId, msg }) => {
			const user = getUser(receiverId)
			console.log(user)
			if (user) {
				console.log(senderId, user)
				io.to(user.socketId).emit("getMsg", {
					senderId,
					msg
				})
			}
		})
	})
}
