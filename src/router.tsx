import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import { RootLayout } from './components/layout/RootLayout';
import Home from './pages/Home';

// The home page ships in the main bundle; every other page loads on demand.
const Services = lazy(() => import('./pages/Services'));
const Products = lazy(() => import('./pages/Products'));
const BizWhats = lazy(() => import('./pages/BizWhats'));
const Acip = lazy(() => import('./pages/Acip'));
const Company = lazy(() => import('./pages/Company'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Old page URLs from the previous site keep working (the server also 301s them).
const legacy: Record<string, string> = {
  'index.html': '/',
  'products.html': '/products/',
  'bizwhats.html': '/bizwhats/',
  'acip.html': '/acip/',
  'about.html': '/company/',
  'contact.html': '/contact/',
  about: '/company/',
};

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'products', element: <Products /> },
      { path: 'bizwhats', element: <BizWhats /> },
      { path: 'acip', element: <Acip /> },
      { path: 'company', element: <Company /> },
      { path: 'contact', element: <Contact /> },
      ...Object.entries(legacy).map(([from, to]) => ({ path: from, element: <Navigate to={to} replace /> })),
      { path: '*', element: <NotFound /> },
    ],
  },
]);
