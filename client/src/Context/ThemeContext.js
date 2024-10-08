import { createContext, useState } from "react";

// 1. Creating the context
export const ThemeContext = createContext();

// 2. The ThemeContextProvider component
export const ThemeContextProvider = ({ children }) => {
    const [state, setState] = useState({
        isLightTheme: false,
        light: { syntax: "#555", ui: "#ddd", bg: "#ddd", body: "#f1f1f1" },
        dark: { syntax: "#ddd", ui: "#333", bg: "#555", body: "#969090" },
    });

    const toggleTheme = () => {
        setState((prevState) => ({
            ...prevState,
            isLightTheme: !prevState.isLightTheme,
        }));
    };

    return (
        <ThemeContext.Provider value={{ ...state, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
