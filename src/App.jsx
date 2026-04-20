import React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { Toaster } from './components/ui/Toast';
import './assets/styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <HashRouter>
          <AppRoutes />
          <Toaster />
        </HashRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
