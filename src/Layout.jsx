import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  // Map paths → titles
  const titles = {
    "/": "Welcome",
    "/introduction": "Introduction",
    "/introductions": "Student Introductions",
    "/contract": "Contract"
  };

  // FIX: get the correct title or fallback
  const pageTitle = titles[location.pathname] || "";

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
