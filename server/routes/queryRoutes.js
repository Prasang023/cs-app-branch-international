const express = require("express")
const {
	getQuerys,
	addQuery,
	getQueryById,
	getUnallotedQuerys,
	getAllotedQuerysByAgentId,
    getQuerysByCustomerId
} = require("../controllers/queryControllers.js")
const router = express.Router()

router.route("/").get(getQuerys).post(addQuery)
router.route("/unalloted").get(getUnallotedQuerys)
router.route("/agent/:id").get(getAllotedQuerysByAgentId)
router.route("/customer/:id").get(getQuerysByCustomerId)
router.route("/:id").get(getQueryById)

module.exports = router
