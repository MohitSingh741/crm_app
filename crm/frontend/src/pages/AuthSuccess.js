import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthSuccess = () => {
    const { setAuthToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            setAuthToken(token);
            navigate('/dashboard');
        }
    }, [location, setAuthToken, navigate]);

    return <div>Authenticating...</div>;
};

export default AuthSuccess;
