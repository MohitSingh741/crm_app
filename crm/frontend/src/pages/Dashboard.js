import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Audience from './Audience';
import Campaigns from './Campaigns';
import CampaignDetail from './CampaignDetail';
const Dashboard = () => {
    return (
        <div>
            <nav>
                <Link to="audience">Audience</Link> | <Link to="campaigns">Campaigns</Link>
            </nav>
            <Routes>
                <Route path="audience" element={<Audience />} />
                <Route path="campaigns" element={<Campaigns />} />
                <Route path="campaigns/:id" element={<CampaignDetail />} />
            </Routes>
        </div>
    );
};

export default Dashboard;
