const RemoveDuplicatesFilter = (movies) => {
  const uniqueIds = new Set();
  const uniqueMovies = movies.filter((movie) => {
    const id = movie.id;
    if (!uniqueIds.has(id)) {
      uniqueIds.add(id);
      return true;
    }
    return false;
  });
  return uniqueMovies;
};

export default RemoveDuplicatesFilter;
