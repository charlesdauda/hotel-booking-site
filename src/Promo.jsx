import { useState, useEffect } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';
import promoBg from './assets/Images/promo.jpg';

// Replace with your YouTube video ID (the part after "v=" in the URL)
const YOUTUBE_ID = 'dQw4w9WgXcQ';

const Promo = () => {
  const [open, setOpen] = useState(false);

  // Lock scroll + close on ESC while the modal is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <>
      <section className="relative h-130 md:h-150 overflow-hidden">
        {/* Background image */}
        <img
          src={promoBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#bf9b6a] text-sm font-semibold tracking-[0.3em] uppercase">
                Promotional Video
              </span>
              <span className="h-px w-14 bg-[#bf9b6a]" />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-[54px] text-white leading-[1.15]">
              Book Hotel Rooms &amp; Deals &amp;<br />
              Book Flights Online.
            </h2>
          </div>

          {/* Right — play button */}
          <div className="flex justify-center lg:justify-end">
            <button
              onClick={() => setOpen(true)}
              aria-label="Play promotional video"
              className="relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full flex items-center justify-center group"
            >
              {/* Pulsing rings */}
              <span className="absolute inset-0 rounded-full bg-[#bf9b6a]/40 animate-ping" />
              <span className="absolute inset-2 rounded-full bg-[#bf9b6a]/60" />

              {/* Solid core */}
              <span className="relative w-full h-full rounded-full bg-[#bf9b6a] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-2xl">
                <FaPlay className="text-white text-3xl md:text-4xl ml-2" />
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ============ Video modal ============ */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4"
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="absolute top-6 right-6 text-white text-3xl hover:text-[#bf9b6a] transition-colors"
          >
            <FaTimes />
          </button>

          {/* Video wrapper — stops backdrop click from closing when clicking the video itself */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video shadow-2xl"
          >
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
              title="Promotional video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Promo;