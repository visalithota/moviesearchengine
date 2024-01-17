import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import "./App.css"

function MovieCard({ item }) {
  return (
    <Link to={`/movie/${item.id}`} key={item.id}>
      <div className="movie-card">
        <img
          className="movie-thumbnail"
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
          alt={item.title}
        />
        <p>
          <b>Title :</b> {item.title}
        </p>
        <p>
          <b>Rating :</b> {item.vote_average} / 10{' '}
        </p>
        <p>
          <b>Release Date :</b> {item.release_date}
        </p>
      </div>
    </Link>
  );
}

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716')
      .then((res) => {
        setPopularMovies(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=cfe422613b250f702980a3bbf9e90716`)
      .then((res) => {
        setSearchedMovies(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [movieName]);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Movie Search Engine</h1>
        <input
          value={movieName}
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
          placeholder="Enter movie name"
        />
      </div>
      <div id="movies-wrapper">
        {movieName === ''
          ? popularMovies.map((item) => <MovieCard key={item.id} item={item} />)
          : searchedMovies.map((item) => <MovieCard key={item.id} item={item} />)}
      </div>
      <Outlet />
    </>
  );
}

export default Home;
