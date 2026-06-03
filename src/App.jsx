import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <BrowserRouter>
      <TopBar />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;