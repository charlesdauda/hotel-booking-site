import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop'; 
import TopBar from './TopBar';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import RoomsSuitesPage from './pages/RoomsSuitesPage';
import ContactPage from './pages/ContactPage';

const App = () => {
  return (
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
  );
};

export default App;