import React from 'react';
import htlLogo from './assets/htl.png';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="logo-container">
                    <img src={htlLogo} className="logo" alt="HackTheLifeWithSmile Logo" />
                </div>
                <h1 className="dashboard-title">hackthelifewithsmile</h1>
            </header>
            <main className="dashboard-content">
                <div className="welcome-card">
                    <h2>Welcome to Your Dashboard</h2>
                    <p>Start hacking life with a smile!</p>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
