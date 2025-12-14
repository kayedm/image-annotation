import React, {createContext, useContext, useEffect} from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        try {
            fetch("http://localhost:5000/me", {
                credentials: "include",
            })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data?.user) setUser(data?.user);
                })
                .finally(() => setLoading(false));
        } catch (error) {
            console.error(error);
        }
    }, [])

    async function login(username, password) {
        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                credentials: "include",
                body: JSON.stringify({username, password}),
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
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async function logout() {
        await fetch("http://localhost:5000/logout", {
            method: "POST",
            credentials: "include",
        })
        setUser(null);
    }

    async function getAnnotations() {
        try {
            const res = await fetch("http://localhost:5000/annotations", {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                return console.error("Error retrieving annotations");
            }

        } catch(e) {
            console.error(e);
        }
    }

    async function saveAnnotation(annotation) {
        try {
            const res = await fetch("http://localhost:5000/annotations", {
                method: "POST",
                credentials: "include",
                header: {"Content-Type:" : "application/json"},
                body: JSON.Stringify(annotation),
            });

            if(!res.ok) {
                return false;
            }

        } catch (e) {
            console.error(e);
        }
    }

    async function deleteAnnotation(annotation) {
        try {
            const res = fetch(`http://localhost:5000/annotations/${annotation.id}`, {
                method: "DELETE",
                credentials: "include",
            })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}