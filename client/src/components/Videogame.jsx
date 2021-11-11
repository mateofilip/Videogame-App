import '../Sass/Styles/Videogame.scss';

export default function Videogame({ name, image, genres }) {
  let genre = genres.join(', ');
  return (
    <div className="Videogame">
      <img src={image} alt="imagen" width="100%" height="250px" />
      <div className="cardContainer">
        <h4>{name}</h4>
        <p>{genre}</p>
      </div>
    </div>
  );
}
