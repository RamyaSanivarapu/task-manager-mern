const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },

        // For normal users → their own id
        // For admin → selected user id
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        status: {
            type: String,
            enum: ["Not Started", "In Progress", "Completed"],
            default: "Not Started",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
