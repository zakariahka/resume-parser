import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LeaderboardContextProvider } from './Contexts/LeaderboardContext';
import { AuthContextProvider } from './Contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LeaderboardContextProvider>
        <App />
      </LeaderboardContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


