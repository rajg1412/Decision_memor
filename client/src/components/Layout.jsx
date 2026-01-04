import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, LogOut, LayoutDashboard } from 'lucide-react';
import './Layout.css';

const Layout = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="layout">
            <header className="header">
                <div className="logo">
                    <Link to="/">DecisionMemory</Link>
                </div>
                <nav className="nav-links">
                    {user ? (
                        <>
                            <Link to="/" className="nav-item"><LayoutDashboard size={18} /> Dashboard</Link>
                            <Link to="/new" className="nav-item"><PlusCircle size={18} /> New Decision</Link>
                            <button onClick={handleLogout} className="nav-item logout-btn"><LogOut size={18} /> Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-item">Login</Link>
                            <Link to="/register" className="nav-item">Register</Link>
                        </>
                    )}
                </nav>
            </header>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
