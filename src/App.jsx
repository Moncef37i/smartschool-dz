import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { Toaster } from './components/ui/Toast';
import './assets/styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AppRoutes />
          <Toaster />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
