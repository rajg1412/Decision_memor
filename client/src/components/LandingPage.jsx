import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* Navbar Overlay */}
            <nav className="landing-nav">
                <div className="logo-text">DecisionMemory</div>
                <div className="nav-actions">
                    <button className="btn-text" onClick={() => navigate('/login')}>Login</button>
                    <button className="btn-primary" onClick={() => navigate('/register')}>Get Started</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Master the Art of <span className="gradient-text">Decision Making</span>
                    </h1>
                    <p className="hero-subtitle">
                        Your external brain for critical choices. Capture context, track outcomes, and build a library of strategic wisdom.
                    </p>
                    <div className="hero-cta">
                        <button className="btn-primary btn-lg" onClick={() => navigate('/register')}>
                            Start Tracking Now <ArrowRight size={20} />
                        </button>
                        <button className="btn-secondary btn-lg" onClick={() => navigate('/demo')}>View Demo</button>
                    </div>
                </div>

                {/* Glassmorphism Visual Element */}
                <div className="hero-visual">
                    <div className="glass-card main-card">
                        <div className="card-header">
                            <div className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>
                        </div>
                        <div className="chart-preview">
                            <div className="graph-line"></div>
                            <div className="data-points">
                                <div className="point p1"></div>
                                <div className="point p2"></div>
                                <div className="point p3"></div>
                            </div>
                        </div>
                        <div className="glass-card stat-card float-1">
                            <span className="stat-label">Confidence</span>
                            <span className="stat-value">92%</span>
                        </div>
                        <div className="glass-card stat-card float-2">
                            <span className="stat-label">Decisions</span>
                            <span className="stat-value">142</span>
                        </div>
                    </div>
                    <div className="glow-effect"></div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="features-section">
                <div className="feature-card">
                    <div className="icon-box"><Zap size={24} /></div>
                    <h3>Capture Context</h3>
                    <p>Don't just record the choice. Record the 'Why'. Preserve your mental model at the moment of decision.</p>
                </div>
                <div className="feature-card">
                    <div className="icon-box"><ShieldCheck size={24} /></div>
                    <h3>Track Outcomes</h3>
                    <p>Close the loop. Review decisions after 6 months to see if your predictions held true.</p>
                </div>
                <div className="feature-card">
                    <div className="icon-box"><BarChart3 size={24} /></div>
                    <h3>Analyze Patterns</h3>
                    <p>Spot your cognitive biases. See where you are overconfident and where you hesitate.</p>
                </div>
            </section>

            <footer className="landing-footer">
                <p>© 2024 Decision Memory System. Elevate your thinking.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
