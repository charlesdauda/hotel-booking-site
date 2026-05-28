import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import NavBar from './NavBar';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      {/* Persistent layout — shows on every page */}
      <TopBar />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;