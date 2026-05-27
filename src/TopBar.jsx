import { MdOutlineEmail } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { FaRegClock } from 'react-icons/fa';
import { FaInstagram, FaTiktok } from 'react-icons/fa6';
import { FaLinkedinIn, FaTwitter,} from 'react-icons/fa';

const contactItems = [
  { icon: <MdOutlineEmail />, text: 'needhelp@company.com' },
  { icon: <IoLocationSharp />, text: '6391 Elgin St. Celina, 10299' },
  { icon: <FaRegClock />, text: 'Sunday - Friday: 9.am - 8pm' },
];

const socialLinks = [
    {icon: <FaInstagram />, href: '#', label: 'Instagram'},
    {icon: <FaTiktok />, href: '#', label: 'TikTok'},
    {icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn'},
    {icon: <FaTwitter />, href: '#', label: 'Twitter'},
];

const TopBar = () => {
  return (
    <section className="bg-black text-white text-sm border-b border-[#d4af6f]/40">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-6">
          {contactItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-white/90">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.href}
              aria-label={social.label}
              className="text-white hover:text-[#d4af6f] transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopBar;