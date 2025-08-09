import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, type Route } from 'router5';
import browserPlugin from 'router5-plugin-browser';

import { RouterProvider } from 'react-router5';

import './index.css';
import './default.css';

import { App } from './App';
import { Error } from 'pages/error';
import { ErrorBoundary } from 'react-error-boundary';

const routes: Route[] = [
  { name: 'home', path: '/' },
  { name: 'podcast', path: '/podcast' },
];

const router = createRouter(routes);

router.usePlugin(browserPlugin());

router.start(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router}>
        <ErrorBoundary FallbackComponent={Error}>
          <App />
        </ErrorBoundary>
      </RouterProvider>
    </StrictMode>
  );
});

