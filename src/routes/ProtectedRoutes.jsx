import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes ({ children }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null) {
            navigate('/login', { replace: true });
        }
    }, [navigate, user])

    return children;
}