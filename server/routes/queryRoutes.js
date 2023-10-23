const express = require("express")
const {
	getQuerys,
	addQuery,
	getQueryById,
	getUnallotedQuerys,
	getAllotedQuerysByAgentId,
	getQuerysByCustomerId,
	allotToAgent,
	updateConversation,
	resolveQuery,
	getCannedMsgs
} = require("../controllers/queryControllers.js")
const router = express.Router()

router.route("/").get(getQuerys).post(addQuery)
router.route("/unalloted").get(getUnallotedQuerys)
router.route("/agent/:id").get(getAllotedQuerysByAgentId).patch(allotToAgent)
router.route("/customer/:id").get(getQuerysByCustomerId)
router.route("/conversation/:id").patch(updateConversation)
router.route("/resolve/:id").patch(resolveQuery)
router.route("/cannedMsgs/:category").get(getCannedMsgs)
router.route("/:id").get(getQueryById)

module.exports = router
