import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CampaignDetail = () => {
    const { id } = useParams();
    const { authToken } = useContext(AuthContext);
    const [campaign, setCampaign] = useState(null);
    const [stats, setStats] = useState({ total: 0, sent: 0, failed: 0 });

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/campaigns/${id}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setCampaign(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchStats = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/campaigns/${id}/stats`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setStats(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCampaign();
        fetchStats();
    }, [id, authToken]);

    if (!campaign) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Campaign: {campaign.name}</h2>
            <p>Created At: {new Date(campaign.createdAt).toLocaleDateString()}</p>
            <h3>Statistics</h3>
            <ul>
                <li>Audience Size: {stats.total}</li>
                <li>Sent: {stats.sent}</li>
                <li>Failed: {stats.failed}</li>
            </ul>
        </div>
    );
};

export default CampaignDetail;
