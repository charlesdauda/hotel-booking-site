import PageHeader from '../PageHeader';
import Contact from '../Contact';
import Map from '../Map';
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