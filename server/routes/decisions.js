const express = require('express');
const router = express.Router();
const Decision = require('../models/Decision');
const jwt = require('jsonwebtoken');

// Middleware to verify token (simplified)
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthenticated' });
    }
};

// Get all decisions for user
router.get('/', auth, async (req, res) => {
    try {
        const decisions = await Decision.find({ user: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(decisions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Create decision
router.post('/', auth, async (req, res) => {
    const decision = req.body;
    const newDecision = new Decision({ ...decision, user: req.userId, createdAt: new Date().toISOString() });
    try {
        await newDecision.save();
        res.status(201).json(newDecision);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Update decision (e.g. outcome)
router.patch('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { title, description, outcome, rating, chosenOption, options, confidence, reasoning } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No decision with that id`);

    const updatedDecision = { title, description, outcome, rating, chosenOption, options, confidence, reasoning, _id: id };

    await Decision.findByIdAndUpdate(id, updatedDecision, { new: true });

    res.json(updatedDecision);
});

// Delete decision
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No decision with that id`);
    await Decision.findByIdAndRemove(id);
    res.json({ message: 'Decision deleted successfully' });
});

module.exports = router;
