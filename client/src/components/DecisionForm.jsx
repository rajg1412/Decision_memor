import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';
import './DecisionForm.css';

const DecisionForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        options: '',
        chosenOption: '',
        confidence: 50,
        reasoning: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...formData,
                options: formData.options.split(',').map(opt => opt.trim())
            };
            await api.createDecision(formattedData);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="form-container">
            <h2>Record a New Decision</h2>
            <form onSubmit={handleSubmit} className="decision-form">
                <div className="form-group">
                    <label>Title (The Question)</label>
                    <input name="title" placeholder="e.g. Should I accept the job offer?" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Context / Description</label>
                    <textarea name="description" rows="3" onChange={handleChange} placeholder="Briefly describe the situation..."></textarea>
                </div>

                <div className="form-group">
                    <label>Options Considered (comma separated)</label>
                    <input name="options" placeholder="Option A, Option B, Option C" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>The Choice Made</label>
                    <input name="chosenOption" placeholder="What did you pick?" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Confidence Level: {formData.confidence}%</label>
                    <input type="range" name="confidence" min="0" max="100" value={formData.confidence} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Reasoning (Why?)</label>
                    <textarea name="reasoning" rows="5" onChange={handleChange} placeholder="Capture your mental model at this moment..."></textarea>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/')} className="cancel-btn">Cancel</button>
                    <button type="submit" className="submit-btn">Save Decision</button>
                </div>
            </form>
        </div>
    );
};

export default DecisionForm;
