import React from "react";
import { useState, useEffect, useCallback } from "react";

import "./Row.css";
import axios from "../api/axios";

const Row = ({ title, id, fetchUrl }) => {
  const [Movies, setMovies] = useState([]);

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    console.log(response);
    setMovies(response.data.results);
    return response;
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="row__posters">
          {Movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span>{">"}</span>
        </div>
      </div>
    </div>
  );
};

export default Row;
