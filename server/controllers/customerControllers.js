const Customer = require("../models/customerModel")
let nextCustomerId = 1

// @desc Fetch all customers
// @route GET /api/customers
const getCustomers = async (req, res) => {
	try {
		const customers = await Customer.find()
		console.log(customers)
		res.status(200).json(customers)
		console.log("get: Customer/ call success")
	} catch (err) {
		res.status(500).json(err)
	}
}

// @desc add new
// @route POST /api/customers
const addCustomer = async (req, res) => {
	const newCustomer = new Customer(req.body)
	newCustomer.customerId = "C-" + nextCustomerId
	try {
		const savedCustomer = await newCustomer.save()
		res.status(200).json(savedCustomer)
		console.log("post: Customer call success")
        nextCustomerId = nextCustomerId + 1
	} catch (err) {
		res.status(500).json(err)
	}
}

// @desc get customer details using Id
// @route GET /api/customers/:id
const getCustomerById = async (req, res) => {
	try {
		const customer = await Customer.find({ customerId: req.params.id })
		res.status(200).json(customer)
		console.log("get: Customer/:id call success")
	} catch (err) {
		res.status(500).json(err)
	}
}

module.exports = { getCustomers, addCustomer, getCustomerById }
