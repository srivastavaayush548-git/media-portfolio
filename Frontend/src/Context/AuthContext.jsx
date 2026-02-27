import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(() => {
        const storedAdmin = localStorage.getItem('adminToken');
        if (storedAdmin) {
            try {
                return JSON.parse(storedAdmin);
            } catch (e) {
                console.error("Failed to parse stored admin token", e);
                localStorage.removeItem('adminToken');
            }
        }
        return null;
    });

    const login = (adminData) => {
        localStorage.setItem('adminToken', JSON.stringify(adminData));
        setAdmin(adminData);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
