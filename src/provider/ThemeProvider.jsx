import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext(null);

function ThemeProvider({children}) {
    const [themeMode, setThemeMode] = useState('dark');
    const toggleThemeMode = () => {
        setThemeMode((prev) => prev === 'dark' ? 'light' : 'dark')
    }
  return (
    <ThemeContext.Provider value={{themeMode, toggleThemeMode}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider