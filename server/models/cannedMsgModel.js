const mongoose = require("mongoose")

const { Schema } = mongoose

const cannedMsgSchema = new Schema(
	{
		category: {
			type: String,
			required: true,
			unique: true
		},
		msgs: [String]
	},
	{ timestamps: true }
)

module.exports = mongoose.model("CannedMsg", cannedMsgSchema)
