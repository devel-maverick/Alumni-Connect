const express = require("express");
const router = express.Router();
const Opportunity = require("../DataBase/Models/Opportunity.model");

// Create a new opportunity
router.post("/", async (req, res) => {
    try {
        const newOpportunity = new Opportunity(req.body);
        const savedOpportunity = await newOpportunity.save();
        res.status(201).json(savedOpportunity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all opportunities
router.get("/", async (req, res) => {
    try {
        const opportunities = await Opportunity.find();
        res.json(opportunities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get specific opportunity by ID
router.get("/:id", async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ message: "Opportunity not found" });
        }
        res.json(opportunity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an opportunity
router.put("/:id", async (req, res) => {
    try {
        const updatedOpportunity = await Opportunity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOpportunity) {
            return res.status(404).json({ message: "Opportunity not found" });
        }
        res.json(updatedOpportunity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an opportunity
router.delete("/:id", async (req, res) => {
    try {
        const deletedOpportunity = await Opportunity.findByIdAndDelete(req.params.id);
        if (!deletedOpportunity) {
            return res.status(404).json({ message: "Opportunity not found" });
        }
        res.json({ message: "Opportunity deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
