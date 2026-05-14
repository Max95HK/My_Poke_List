/**
 * Node modules
 */
import { createBrowserRouter } from 'react-router';

/**
 * Components
 */
import RootLayout from '@/layout/root-layout';
import Home from '@/pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default router;
