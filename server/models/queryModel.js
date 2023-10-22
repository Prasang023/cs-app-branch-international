const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    text: { type: "string", required: true },
	sentBy: { type: "string", required: true }
}, {
    timestamps: true,
})

QuerySchema = new mongoose.Schema(
	{
		customerId: { type: String, required: true },
		agentId: { type: String, default: "empty" },
		priority: { type: Number, default: 3 },
		isAlloted: { type: Boolean, default: false },
		isResolved: { type: Boolean, default: false },
		query: { type: String, required: true },
		conversation: [messageSchema]
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Query", QuerySchema)
