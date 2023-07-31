import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from "../../api/axios";

const DetailPage = () => {
  const [movie, setMovie] = useState({});
  let { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/movie/${movieId}`);
      console.log(response);
      setMovie(response.data);
    };
    fetchData();
  }, [movieId]);

  if (!movie) return null;
  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="modal__poster-img"
      />
    </section>
  );
};

export default DetailPage;
