import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutContextProvider } from './Context/WorkoutContext';
import { AuthContextProvider } from './Context/AuthContext';
import { ThemeContextProvider } from './Context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
