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
    <nav>
      <ul>
        {pageNumbers?.map((number) => {
          return (
            <li key={number}>
              <a onClick={() => pagination(number)}>{number}</a>;
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
