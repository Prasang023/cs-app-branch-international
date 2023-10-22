const mongoose = require("mongoose")

const { Schema } = mongoose

const customerSchema = new Schema(
	{
		customerId: {
			type: String,
			required: true,
			unique: true
		},
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			unique: true
		}
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Customer", customerSchema)
