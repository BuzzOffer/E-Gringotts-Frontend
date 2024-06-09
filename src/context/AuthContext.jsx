import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(context === undefined) {
        throw new Error('Use auth must be used within AuthProvider');
    }

    return context;
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user);
    } ;

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}