import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  const titles = {
    "/": "Welcome",
    "/introduction": "Introduction",
    "/contract": "Contract"
  };

  const pageTitle = titles[location.pathname] || "Page";

  return (
    <>
      <Header title={pageTitle} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}