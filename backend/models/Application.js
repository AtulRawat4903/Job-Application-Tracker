const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: [
                "Applied",
                "Interview",
                "Accepted",
                "Rejected"
            ],
            default: "Applied"
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Application",
    applicationSchema
);