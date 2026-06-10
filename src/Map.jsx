const Map = ({ location = 'McCarthy Hills, Accra, Ghana', zoom = 14 }) => {
  const query = encodeURIComponent(location);
  return (
    <section className="w-full">
      <iframe
        title={`Map of ${location}`}
        src={`https://maps.google.com/maps?q=${query}&output=embed&z=${zoom}`}
        className="w-full h-100 lg:h-125 border-0 block"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
};

export default Map;