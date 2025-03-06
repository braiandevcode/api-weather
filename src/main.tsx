import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ContextWeatherProvider } from './context/ContextWeather.tsx';

// ROOT APP
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextWeatherProvider>
      <App />
    </ContextWeatherProvider>
  </StrictMode>
);
