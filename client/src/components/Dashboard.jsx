import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';
import { Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ demo = false }) => {
    const [decisions, setDecisions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (demo) {
            setDecisions([
                { _id: '1', title: 'Example: Switch Jobs?', createdAt: new Date().toISOString(), confidence: 85, chosenOption: 'Accept Offer', rating: 5, outcome: 'Great culture!' },
                { _id: '2', title: 'Example: Buy vs Rent', createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), confidence: 60, chosenOption: 'Rent for now' },
                { _id: '3', title: 'Example: Project Tech Stack', createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), confidence: 95, chosenOption: 'React + Node', rating: 4, outcome: 'Fast dev speed' }
            ]);
            return;
        }

        const getDecisions = async () => {
            try {
                const { data } = await api.fetchDecisions();
                setDecisions(data);
            } catch (error) {
                if (error.response?.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                }
                console.error(error);
            }
        };
        getDecisions();
    }, [navigate, demo]);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Your Decision Timeline</h2>
            </header>

            {decisions.length === 0 ? (
                <div className="empty-state">
                    <p>No decisions recorded yet. Start by tracking your first choice.</p>
                    <button onClick={() => navigate('/new')}>Record Decision</button>
                </div>
            ) : (
                <div className="timeline">
                    {decisions.map((decision) => (
                        <div key={decision._id} className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <span className="date">
                                    <Calendar size={14} />
                                    {new Date(decision.createdAt).toLocaleDateString()}
                                </span>
                                <h3>{decision.title}</h3>
                                <div className="decision-meta">
                                    <span className={`confidence-badge c-${Math.floor(decision.confidence / 10) * 10}`}>
                                        {decision.confidence}% Confidence
                                    </span>
                                    {decision.outcome && (
                                        <span className="outcome-badge">
                                            {decision.rating >= 4 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                            Has Outcome
                                        </span>
                                    )}
                                </div>
                                {decision.chosenOption && (
                                    <p className="chosen-option">Chose: <strong>{decision.chosenOption}</strong></p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
