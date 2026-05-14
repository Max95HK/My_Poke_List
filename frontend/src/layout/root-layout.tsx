/**
 * Node modules
 */
import Header from '@/components/layout/header';
import { Outlet } from 'react-router';

/**
 * Components
 */

const RootLayout = () => {
  return (
    <div className='flex flex-col'>
      <Header />
      
      <main className='mt-30 container py-4'>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
