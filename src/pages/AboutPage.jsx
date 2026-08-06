import PageHeader from '../components/PageHeader';
import About from '../components/About';
import Rooms from '../components/Rooms';
import Promo from '../components/Promo';
import Services from '../components/Services';
import hero1 from '../assets/Images/hero1.jpg';

const AboutPage = () => {
  return (
    <>
      <PageHeader title="About" bgImage={hero1} />
      <About />
      <Rooms />
      <Promo />
      <Services />
    </>
  );
};

export default AboutPage;