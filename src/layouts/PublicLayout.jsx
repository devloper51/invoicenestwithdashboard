import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16"> {/* Ensure content doesn't hide behind fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout; 