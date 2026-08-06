import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';
import Map from '../components/Map';
import hero1 from '../assets/Images/hero1.jpg';

const ContactPage = () => {
  return (
    <>
      <PageHeader title="Contact" bgImage={hero1} />
      <Contact />
      <Map />
    </>
  );
};

export default ContactPage;