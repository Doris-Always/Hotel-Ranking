const CardList = ({cards}) => {
    return (
      <ul className="list">
      {movies?.map((movie) => (
       <Movie movie={movie} key={movie.imdbID}/>
      ))}
    </ul>
    )
  }
  
  export default CardList