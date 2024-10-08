import React, { useContext } from 'react'
import { ThemeContext } from '../Context/ThemeContext';

const ToggleTheme = () => {
    const { isLightTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <span className='material-symbols-outlined themeMode'
              style={isLightTheme ? { color: "darkblue" } : { color: "yellow" }} 
              onClick={toggleTheme} >
            {isLightTheme ? "bedtime" : "sunny"}
        </span>
    )
}

export default ToggleTheme


