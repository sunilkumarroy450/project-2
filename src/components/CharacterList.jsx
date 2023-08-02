import React, { useEffect, useState } from "react";
import Pulse from "react-reveal/Pulse";
import Zoom from "react-reveal/Pulse";

const CharacterList = ({ data: selectedMovies }) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!selectedMovies || selectedMovies.length === 0) {
        setCharacters([]);
        return;
      }
      setIsLoading(true);

      try {
        if (selectedMovies.length > 0) {
          const characterPromises = selectedMovies.map((movie) =>
            fetch(`https://swapi.dev/api/films/?search=${movie}`).then(
              (response) => response.json()
            )
          );

          const movieData = await Promise.all(characterPromises);
          const characters = movieData.flatMap((data) => {
            const movie = data.results[0];
            const characterUrls = movie.characters;
            return characterUrls.map((url) =>
              fetch(url).then((res) => res.json())
            );
          });
          const charactersData = await Promise.all(characters);

          setCharacters(charactersData);
        }
      } catch (error) {
        setCharacters([]);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [selectedMovies]);
  if (isLoading) {
    return (
      <div className="text text-3xl flex justify-center items-center p-10 font-extrabold animate-bounce">
        Loading...
      </div>
    );
  }
  return (
    <div>
      {selectedMovies.length > 0 && (
        <h2 className="text text-center font-bold py-2">
          <Zoom>Characters from selected movies</Zoom>
        </h2>
      )}
      {selectedMovies.length >= 1 && (
        <ul className=" grid grid-cols-4 gap-2">
          {characters.map((character, index) => (
            <Pulse>
              <li
                className="border border-black p-4 justify-center items-center  rounded-md hover:italic hover:font-medium hover:cursor-pointer break-all hover:tracking-wide"
                key={index}
              >
                {character.name}
              </li>
            </Pulse>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharacterList;
