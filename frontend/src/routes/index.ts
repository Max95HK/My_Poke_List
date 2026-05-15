/**
 * Node modules
 */
import { createBrowserRouter } from 'react-router';

/**
 * Components
 */
import RootLayout from '@/layout/root-layout';
import Home from '@/pages/home';

/**
 * Loaders
 */
import { rootLoader } from '@/loaders/root-loader';

const router = createBrowserRouter([
  {
    id: "root",
    path: '/',
    Component: RootLayout,
    loader: rootLoader,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default router;
