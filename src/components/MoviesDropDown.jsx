import React, { useEffect, useState } from "react";
import Select from "react-select";
import CharacterList from "./CharacterList";
import Shake from "react-reveal/Shake";

const MoviesDropDown = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("https://swapi.dev/api/films/")
      .then((response) => response.json())
      .then((data) => {
        const movieNames = data.results.map((movie) => ({
          value: movie.title,
          label: movie.title,
        }));
        setMovies(movieNames);
      })
      .catch((error) => console.error("Error fetching movie data:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleMovieSelect = (selectedOptions) => {
    const selectedMovies = selectedOptions.map((option) => option.value);
    setSelectedMovies(selectedMovies);
  };

  console.log(selectedMovies);
  if (loading) {
    return (
      <div className="text text-3xl flex justify-center items-center p-10 font-extrabold animate-bounce">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col justify-center items-center p-10 gap-5">
      <h1 className="text-3xl text-blue-500 font-bold">
        <Shake>Movies</Shake>
      </h1>
      <div className="w-1/2">
        <Select options={movies} onChange={handleMovieSelect} isMulti />
      </div>

      <CharacterList data={selectedMovies} />
    </div>
  );
};

export default MoviesDropDown;
