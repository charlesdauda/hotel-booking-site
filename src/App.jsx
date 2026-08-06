import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import RoomsSuitesPage from './pages/RoomsSuitesPage';
import ContactPage from './pages/ContactPage';
import { BookingProvider } from './context/BookingProvider';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop';



const App = () => {
  return (
    <BookingProvider>
      <BrowserRouter>
        <ScrollToTop />
        <TopBar />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/rooms-suites" element={<RoomsSuitesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </BookingProvider>
  );
};

export default App;