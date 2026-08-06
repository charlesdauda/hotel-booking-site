import PageHeader from '../components/PageHeader';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import hero1 from '../assets/Images/hero1.jpg';

const GalleryPage = () => {
  return (
    <>
      <PageHeader title="Gallery" bgImage={hero1} />
      <Gallery />
      <Footer />
    </>
  );
};

export default GalleryPage;