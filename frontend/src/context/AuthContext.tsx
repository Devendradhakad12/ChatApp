import React, { createContext, useContext, useState } from "react";


export const AuthContext = createContext<{ user: any, setUser: any }>({ user: null, setUser: () => { } });

export const useAuthContext = () => {
    const { user, setUser } = useContext(AuthContext);
    return { user, setUser };
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('mca-user')!) || null);
    return <AuthContext.Provider value={{ user: user, setUser }}>
        {children}
    </AuthContext.Provider>
};