const Query = require("../models/queryModel")
// let nextQueryId = 1

// @desc Fetch all queries
// @route GET /api/querys
const getQuerys = async (req, res) => {
	try {
		const querys = await Query.find()
		console.log(querys)
		res.status(200).json(querys)
		console.log("get: Query/ call success")
	} catch (err) {
		res.status(500).json(err)
	}
}

// @desc add new
// @route POST /api/querys
const addQuery = async (req, res) => {
	const newQuery = new Query(req.body)
	// newQuery.queryId = "Q-" + nextQueryId
	try {
		const savedQuery = await newQuery.save()
		res.status(200).json(savedQuery)
		console.log("post: Add Query success")
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}

// @desc get query details using Id
// @route GET /api/querys/:id
const getQueryById = async (req, res) => {
	try {
		const query = await Query.findById(req.params.id)
		res.status(200).json(query)
		console.log("get: Query/:id call success")
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}

// @desc get unalloted queries
// @route GET /api/querys/unalloted
const getUnallotedQuerys = async (req, res) => {
	try {
		const query = await Query.find({ isAlloted: false })
		res.status(200).json(query)
		console.log("get: Query/unalloted call success")
	} catch (err) {
		res.status(500).json(err)
	}
}

// @desc get alloted queries to a agent
// @route GET /api/querys/agent/:id
const getAllotedQuerysByAgentId = async (req, res) => {
	try {
		const query = await Query.find({ agentId: req.params.id })
		res.status(200).json(query)
		console.log("get: Query/agent/:id call success")
	} catch (err) {
		res.status(500).json(err)
	}
}

// @desc get queries acc to customer id
// @route GET /api/querys/customer/:id
const getQuerysByCustomerId = async (req, res) => {
	try {
		const query = await Query.find({ customerId: req.params.id })
		res.status(200).json(query)
		console.log("get: Query/customer/:id call success")
	} catch (err) {
		res.status(500).json(err)
	}
}

const allotToAgent = async (req, res) => {
	const queryId = req.params.id
	const agentId = req.body.agentId
	try {
		const data = await Query.updateOne(
			{ _id: queryId },
			{
				$set: { agentId: agentId, isAlloted: true },
				$currentDate: { lastModified: true }
			}
		)
		res.status(200).json(data)
		console.log("get: Query/customer/:id call success")
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}

const updateConversation = async (req, res) => {
	const queryId = req.params.id
	const convo = req.body.conversation

	try {
		const data = await Query.updateOne(
			{
				_id: queryId
			},
			{
				$push: {
					conversation: { $each: convo }
				}
			}
		)
		res.status(200).json(data)
		console.log("get: Query/customer/:id call success")
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}

module.exports = {
	getQuerys,
	addQuery,
	getQueryById,
	getUnallotedQuerys,
	getAllotedQuerysByAgentId,
	getQuerysByCustomerId,
	allotToAgent,
	updateConversation
}
