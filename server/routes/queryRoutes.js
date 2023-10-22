const express = require('express')
const { getQuerys, addQuery, getQueryById } = require('../controllers/queryControllers.js')
const router = express.Router()

router.route('/')
            .get(getQuerys)
            .post(addQuery)
router.route('/:id')
            .get(getQueryById)

module.exports = router