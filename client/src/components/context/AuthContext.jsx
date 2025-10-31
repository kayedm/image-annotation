import React, {createContext, useContext, useEffect} from "react";

const AuthContext = createContext();

export function AuthProvider({ children}) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/me", {
            credentials: "include",
        })
            .then(res => (res.ok ? res.json() : null))
            .then(data => {
                if(data?.user) setUser(data?.user);
            })
            .finally(() => setLoading(false));
    }, [])

    async function login(username, password) {
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({ username, password}),
        });

        if (res.ok) {
            const me = await fetch("http://localhost:5000/me", {
                credentials: "include",
            });

            const data = await me.json();
            setUser(data.user);
            return true;
        }
        return false;
    }

    async function logout() {
        await fetch("http://localhost:5000/logout", {
            method: "POST",
            credentials: "include",
        })
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth () {
    return useContext(AuthContext);
}