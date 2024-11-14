// src/pages/Audience.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Audience = () => {
    const { authToken } = useContext(AuthContext);
    const [criteria, setCriteria] = useState({
        totalSpending: { gt: '', lt: '' },
        visits: { lte: '', gte: '' },
        lastVisitDate: { before: '', after: '' },
    });
    const [audienceSize, setAudienceSize] = useState(null);

    const handleChange = (e, category, field) => {
        setCriteria({
            ...criteria,
            [category]: {
                ...criteria[category],
                [field]: e.target.value,
            },
        });
    };

    const calculateAudience = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/campaigns/calculate-audience',
                { audienceCriteria: criteria },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            setAudienceSize(response.data.size);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/campaigns',
                { name: 'New Campaign', audienceCriteria: criteria },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            alert('Campaign Created Successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create Audience Segment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Total Spending</h3>
                    <input
                        type="number"
                        placeholder="Greater than"
                        value={criteria.totalSpending.gt}
                        onChange={(e) => handleChange(e, 'totalSpending', 'gt')}
                    />
                    <input
                        type="number"
                        placeholder="Less than"
                        value={criteria.totalSpending.lt}
                        onChange={(e) => handleChange(e, 'totalSpending', 'lt')}
                    />
                </div>
                <div>
                    <h3>Visits</h3>
                    <input
                        type="number"
                        placeholder="Less than or equal to"
                        value={criteria.visits.lte}
                        onChange={(e) => handleChange(e, 'visits', 'lte')}
                    />
                    <input
                        type="number"
                        placeholder="Greater than or equal to"
                        value={criteria.visits.gte}
                        onChange={(e) => handleChange(e, 'visits', 'gte')}
                    />
                </div>
                <div>
                    <h3>Last Visit Date</h3>
                    <input
                        type="date"
                        placeholder="Before"
                        value={criteria.lastVisitDate.before}
                        onChange={(e) => handleChange(e, 'lastVisitDate', 'before')}
                    />
                    <input
                        type="date"
                        placeholder="After"
                        value={criteria.lastVisitDate.after}
                        onChange={(e) => handleChange(e, 'lastVisitDate', 'after')}
                    />
                </div>
                <button type="button" onClick={calculateAudience}>
                    Calculate Audience Size
                </button>
                {audienceSize !== null && <p>Audience Size: {audienceSize}</p>}
                <button type="submit">Save Campaign</button>
            </form>
        </div>
    );
};

export default Audience;
