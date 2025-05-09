
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check if a redirect to the index page is needed
const needsOnboarding = () => {
  // Skip in development environment to avoid redirect loops
  if (import.meta.env.DEV) {
    return false;
  }
  
  const hasUsername = localStorage.getItem('focos_username');
  const currentPath = window.location.pathname;
  
  // If no username and not already on the index page, we need onboarding
  return !hasUsername && currentPath !== '/index';
};

// Redirect if needed
if (needsOnboarding()) {
  window.location.href = '/index';
}

createRoot(document.getElementById("root")!).render(<App />);
