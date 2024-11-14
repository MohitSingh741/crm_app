import React from 'react';

const Login = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Login with Google</h2>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
