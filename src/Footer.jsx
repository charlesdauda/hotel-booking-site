import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowsAlt } from 'react-icons/fa';
import hotelLogo from './assets/Images/hotelLogo.png';
import news1 from './assets/Images/room4.jpg';
import news2 from './assets/Images/room2.jpg';

const servicesLinks = [
  { name: 'Home',        link: '/' },
  { name: 'Suites',      link: '/rooms-suites' },
  { name: 'Gymnasium',   link: '#' },
  { name: 'News',        link: '#' },
  { name: 'About Hotel', link: '/about' },
  { name: 'Wellness',    link: '#' },
  { name: 'Spa',         link: '#' },
  { name: 'Gallery',     link: '/gallery' },
  { name: 'Contact Us',  link: '/contact' },
];

const news = [
  { image: news1, title: 'Discover the Art of Slow Travel', date: 'January 31, 2026' },
  { image: news2, title: 'Why Wellness Defines Modern Luxury', date: 'January 31, 2026' },
];

const socials = [
  { icon: FaTwitter,    link: '#', label: 'Twitter' },
  { icon: FaFacebookF,  link: '#', label: 'Facebook' },
  { icon: FaYoutube,    link: '#', label: 'YouTube' },
  { icon: FaInstagram,  link: '#', label: 'Instagram' },
];

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* ===== Main content ===== */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          <div>
            <img
              src={hotelLogo}
              alt="Vacation Houses"
              className="h-14 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-gray-400 leading-relaxed mb-6">
              Vacation Houses is a luxury hospitality brand dedicated to crafting unforgettable stays where every room, meal, and moment is designed around you.
            </p>
            <div className="flex gap-3">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.link}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-full bg-black flex items-center justify-center hover:bg-[#bf9b6a] transition-colors"
                  >
                    <Icon className="text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl mb-6">Services Links</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-3">
              {servicesLinks.map((item, i) => (
                <Link
                  key={i}
                  to={item.link}
                  className="flex items-center gap-3 text-gray-300 hover:text-[#bf9b6a] transition-colors"
                >
                  <FaArrowsAlt className="text-[#bf9b6a] text-xs shrink-0" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl mb-6">Latest News</h3>
            <div className="space-y-5">
              {news.map((item, i) => (
                <div key={i} className="flex gap-4 cursor-pointer group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-serif text-base text-white leading-snug mb-1 group-hover:text-[#bf9b6a] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[#bf9b6a] text-sm">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ----- Column 4: information ----- */}
          <div>
            <h3 className="font-serif text-2xl mb-6">Information</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-[#bf9b6a] text-xl shrink-0 mt-1" />
                <p className="text-gray-300">+233 123 456 7890</p>
              </div>
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-[#bf9b6a] text-xl shrink-0 mt-1" />
                <p className="text-gray-300">charlesdauda676@gmail.com</p>
              </div>
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-[#bf9b6a] text-xl shrink-0 mt-1" />
                <p className="text-gray-300 leading-relaxed">
                  McCarthy Hills, Accra, Greater Accra, Ghana
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <p className="text-center md:text-left">© Copyright {new Date().getFullYear()} Sheraton Hotel & Suites. All rights reserved.</p>
          <div className="flex gap-3">
            <a href="#" className="hover:text-[#bf9b6a] transition-colors">Help</a>
            <span>/</span>
            <a href="#" className="hover:text-[#bf9b6a] transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;