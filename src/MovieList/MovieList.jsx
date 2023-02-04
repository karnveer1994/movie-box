import React, { useEffect, useState } from "react"
import Movie from "./Movie"
import axios from '../axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies").then((response) => {
      setMovies(response.data)
    })
  })

  return <ImageList sx={{ width: '80%', height: '100%' }} cols={3}>
    {
      movies.map (m => {
        return <ImageListItem key={m.Title}>
          <Movie key={m.Title} movie={m} />
        </ImageListItem>
      })
    }
  </ImageList> 
}

export default MovieList;

