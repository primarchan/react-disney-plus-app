import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from "../../api/axios";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");

  useEffect(() => {
    if (searchTerm) fetchSearchMovie(searchTerm);
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return <div>SearchPage</div>;
};

export default SearchPage;
