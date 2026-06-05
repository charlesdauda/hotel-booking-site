import room1 from './assets/Images/room1.jpg';
import room2 from './assets/Images/room2.jpg';
import room3 from './assets/Images/room3.jpg';
import room4 from './assets/Images/room4.jpg';
import featured1 from './assets/Images/featured1.jpg';
import featured2 from './assets/Images/featured2.jpg';
import hospThumb1 from './assets/Images/hospThumb1.jpg';
import hospThumb2 from './assets/Images/hospThumb2.jpg';
import hospitality from './assets/Images/hospitality.jpg';

const galleryImages = [
  room1, room2, room3,
  room4, featured1, featured2,
  hospThumb1, hospThumb2, hospitality,
];

const Gallery = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="group relative overflow-hidden h-72 lg:h-80 cursor-pointer"
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;