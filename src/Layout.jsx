import Header from './Header.jsx';
import { Outlet } from 'react-router';
    
export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>DM Designs &copy; 2025</p>
      </footer>
    </>
  );
}