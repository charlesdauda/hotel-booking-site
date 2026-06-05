import PageHeader from '../PageHeader';
import Gallery from '../Gallery';
import Footer from '../Footer';
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