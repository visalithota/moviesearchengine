import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function MovieDetailPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newYear, setNewYear] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=cfe422613b250f702980a3bbf9e90716`)
      .then((res) => {
        setMovieDetails(res.data);
        // Set initial values for title and year
        setNewTitle(res.data.title);
        setNewYear(res.data.release_date.substring(0, 4));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleUpdate = () => {
    setIsUpdating(true);

    setTimeout(() => {
      setIsUpdating(false);
      console.log('Movie updated successfully!');

      const updatedMovies = JSON.parse(localStorage.getItem('movies')) || [];
      const index = updatedMovies.findIndex((movie) => movie.id === Number(id));
      if (index !== -1) {
        // Update title and year
        updatedMovies[index] = {
          ...updatedMovies[index],
          title: newTitle,
          release_date: `${newYear}-01-01`, // Assuming the release date format
        };
        localStorage.setItem('movies', JSON.stringify(updatedMovies));

        // Notify the Home component that the movie has been updated
        navigate('/');
      }
    }, 1000);
  };

  const handleDelete = () => {
    setIsDeleting(true);

    setTimeout(() => {
      setIsDeleting(false);
      console.log('Movie deleted successfully!');

      const updatedMovies = JSON.parse(localStorage.getItem('movies')) || [];
      const filteredMovies = updatedMovies.filter((movie) => movie.id !== Number(id));
      localStorage.setItem('movies', JSON.stringify(filteredMovies));
      navigate('/');
    }, 1000);
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Title: {movieDetails.title}</p>
      <p>Year: {movieDetails.release_date.substring(0, 4)}</p>
      <label>
        New Title:
        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      </label>
      <label>
        New Year:
        <input type="text" value={newYear} onChange={(e) => setNewYear(e.target.value)} />
      </label>
      <button onClick={handleUpdate} disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update Movie'}
      </button>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete Movie'}
      </button>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default MovieDetailPage;
