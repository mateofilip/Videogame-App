import '../Sass/Styles/Pagination.scss';

export default function Pagination({
  videogamesPerPage,
  allVideogames,
  pagination,
}) {
  const pageNumbers = [];

  for (
    let index = 0;
    index < Math.ceil(allVideogames / videogamesPerPage);
    index++
  ) {
    pageNumbers.push(index + 1);
  }

  return (
    <nav className="Pagination">
      {pageNumbers?.map((number) => {
        return <button onClick={() => pagination(number)}>{number}</button>;
      })}
    </nav>
  );
}
