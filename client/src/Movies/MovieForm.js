import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";




const MovieForm = props => {
  const initialMovie = props.movie;
  const [movie, setMovie] = useState(initialMovie);
  const history = useHistory();

  useEffect(() => {
    console.log(props.movie.stars);
    props.updateMovie(movie);
  }, props.movie );


  const changeHandler = e => {
    if (e.target.name !== 'stars'){
        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
        })
    } else {        
        setMovie({
            ...movie,
            stars: [...e.target.value.split(",")]
        })
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res)
        props.updateMovie(movie);
      })
      .catch(err => console.log(err));
    history.push(`/movies/${movie.id}`);
  };

  return (
    <div className='form-wrapper'>
      <h2>Update Movie</h2>
      <div className='update-form'>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
            />
            <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
            />
            <input
                type="text"
                name="metascore"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
            />
            <input
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="stars"
                value={[movie.stars]}
            />

            <div className="baseline" />
            <button className="md-button form-button">Update</button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
