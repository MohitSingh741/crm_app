import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Xeno's CRM & Campaign Management App</h1>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Home;
