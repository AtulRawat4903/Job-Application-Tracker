const express = require("express");
const router = express.Router();

const Application = require("../models/Application");

// CREATE APPLICATION
router.post("/", async (req, res) => {
    try {
        const application = await Application.create(req.body);

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET ALL APPLICATIONS
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find();

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE APPLICATION
router.delete("/:id", async (req, res) => {
    try {
        await Application.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Application deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;