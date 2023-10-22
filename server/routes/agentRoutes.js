const express = require('express')
const { getAgents, addAgent, getAgentById } = require('../controllers/agentControllers.js')
const router = express.Router()

router.route('/')
            .get(getAgents)
            .post(addAgent)
router.route('/:id')
            .get(getAgentById)

module.exports = router