import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext';
import { FilterProvider } from './context/FilterContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import SpaListPage from './pages/SpaListPage';
import SpaDetailPage from './pages/SpaDetailPage';
import PopularSpasPage from './pages/PopularSpasPage';
import RecentSpasPage from './pages/RecentSpasPage';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import SpaBookingPage from './pages/SpaBookingPage';
import BookingPage from './pages/BookingPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (
    <Router>
      <Navbar />
      <div className='h-16'></div>
      <LocationProvider>
        <FilterProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spas" element={<SpaListPage />} />
            <Route path="/spas/:id" element={<SpaDetailPage />} />
            <Route path="/popular" element={<PopularSpasPage />} />
            <Route path="/recent" element={<RecentSpasPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book-an-appointment" element={<SpaBookingPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </FilterProvider>
      </LocationProvider>
      <Footer />
    </Router>
  );
}

export default App;