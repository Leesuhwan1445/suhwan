const MovieCard = ({ title, posterPath, rating }) => {
  const imageUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  return (
    <div className="bg-gray-800 rounded overflow-hidden shadow-lg hover:scale-105 transition-transform aspect-[2/3]">
      <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
      <div className="p-4 text-white">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm">{rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;