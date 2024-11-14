import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        localStorage.setItem('authToken', authToken);
    }, [authToken]);

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
