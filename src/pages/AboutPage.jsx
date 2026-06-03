import PageHeader from '../PageHeader';
import About from '../About';
import Rooms from '../Rooms';
import Promo from '../Promo';
import Services from '../Services';
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