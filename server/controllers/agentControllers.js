const Agent = require("../models/agentModel")
let nextAgentId = 1
let nextCustomerId = 1

// @desc Fetch all agents
// @route GET /api/agents
const getAgents = async (req, res) => {
	try {
		const agents = await Agent.find()
		console.log(agents)
		res.status(200).json(agents)
		console.log("get: Agent/ call success")
	} catch (err) {
		res.status(500).json(err)
	}
}

// @desc add new
// @route POST /api/agents
const addAgent = async (req, res) => {
	const newAgent = req.body
	newAgent.agentId = "A-" + nextAgentId
	console.log(newAgent)
	const addAgentData = new Agent(newAgent) 
	try {
		const savedAgent = await addAgentData.save()
		res.status(200).json(savedAgent)
		console.log("post: Agent call success")
		nextAgentId = nextAgentId + 1
	} catch (err) {
		res.status(500).json(err)
	}
}

// @desc get agent details using Id
// @route GET /api/agents/:id
const getAgentById = async (req, res) => {
	try {
		const agent = await Agent.findById(req.params.id)
		res.status(200).json(agent)
		console.log("get: Agent/:id call success")
	} catch (err) {
		res.status(500).json(err)
	}
}

module.exports = { getAgents, addAgent, getAgentById }
