import Hero from '../components/Hero';
import About from '../components/About';
import Rooms from '../components/Rooms';
import Services from '../components/Services';
import Promo from '../components/Promo';
import FeaturedRooms from '../components/FeaturedRooms';
import Hospitality from '../components/Hospitality';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Rooms />
      <Services />
      <Promo />
      <FeaturedRooms />
      <Hospitality />
      <Stats />
      <Testimonials />
    </>
  );
};

export default Home;