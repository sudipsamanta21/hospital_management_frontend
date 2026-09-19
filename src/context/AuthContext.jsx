import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider ({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore user when application starts/refreshed
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error(
                "Error restoring authentication:",
                error
            );

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Login
    const login = (response) => {
        const token = response?.token;
        const userData = response?.user;

        if (!token || !userData) {
            throw new Error(
                "Invalid login response."
            );
        }

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        // THIS fixes the refresh problem
        setUser(userData);

        return userData;
    };


    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth  ()  {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}

