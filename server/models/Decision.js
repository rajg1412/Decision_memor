const mongoose = require('mongoose');

const DecisionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    options: [{ type: String }],
    chosenOption: { type: String },
    confidence: { type: Number, min: 0, max: 100 },
    reasoning: { type: String },
    outcome: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Decision', DecisionSchema);
