import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Campaigns = () => {
    const { authToken } = useContext(AuthContext);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/campaigns', {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setCampaigns(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCampaigns();
    }, [authToken]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Campaigns</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map(campaign => (
                        <tr key={campaign._id}>
                            <td>{campaign.name}</td>
                            <td>{new Date(campaign.createdAt).toLocaleDateString()}</td>
                            <td>
                                <a href={`/dashboard/campaigns/${campaign._id}`}>View</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Campaigns;
