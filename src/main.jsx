import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWithTabs from './AppWithTabs.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// Suppress Chrome extension errors
const originalError = console.error;
console.error = (...args) => {
  const message = args[0]?.toString() || '';

  // Ignore Chrome extension errors
  if (
    message.includes('runtime.lastError') ||
    message.includes('message channel closed') ||
    message.includes('Extension context invalidated')
  ) {
    return;
  }

  originalError.apply(console, args);
};

// Suppress unhandled promise rejections from extensions
window.addEventListener('unhandledrejection', (event) => {
  const message = event.reason?.message || '';

  if (
    message.includes('runtime.lastError') ||
    message.includes('message channel closed') ||
    message.includes('Extension context invalidated')
  ) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AppWithTabs />
    </ErrorBoundary>
  </StrictMode>,
)
