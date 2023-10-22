const express = require('express')
const { getCustomers, addCustomer, getCustomerById } = require('../controllers/customerControllers.js')
const router = express.Router()

router.route('/')
            .get(getCustomers)
            .post(addCustomer)
router.route('/:id')
            .get(getCustomerById)

module.exports = router