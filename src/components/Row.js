import React from "react";
import { useState, useEffect, useCallback } from "react";

import "./Row.css";
import axios from "../api/axios";
import MovieModal from "./MovieModal";

const scrollMoveLeft = (id) => {
  document.getElementById(id).scrollLeft -= window.innerWidth - 80;
};
const scrollMoveRight = (id) => {
  document.getElementById(id).scrollLeft += window.innerWidth - 80;
};

const Row = ({ title, id, fetchUrl }) => {
  const [Movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
    return response;
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span className="arrow" onClick={() => scrollMoveLeft(id)}>
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {Movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span className="arrow" onClick={() => scrollMoveRight(id)}>
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default Row;
