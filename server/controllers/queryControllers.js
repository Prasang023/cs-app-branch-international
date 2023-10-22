const Query = require("../models/queryModel")
let nextQueryId = 1

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
	newQuery.queryId = "Q-" + nextQueryId
	try {
		const savedQuery = await newQuery.save()
		res.status(200).json(savedQuery)
		console.log("post: Query call success")
	} catch (err) {
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
		res.status(500).json(err)
	}
}

module.exports = { getQuerys, addQuery, getQueryById }
