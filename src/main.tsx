import {StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div className="flex min-h-dvh items-center justify-center bg-background"><div className="size-8 animate-spin rounded-full border-4 border-muted border-t-brand-600" /></div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
