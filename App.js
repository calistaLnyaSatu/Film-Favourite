import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from './components/MovieListHeading.js';
import SearchBox from './components/SearchBox.js';
import AddFavourites from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8e605823`;

    const response = await fetch(url);
    const responseJson = await response.json();
    
    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(()=>{
    getMovieRequest(searchValue);
  }, [searchValue])

  const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
  };
  
  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
	};

  return (
    <>
    <div className='header d-flex align-items-center'>
      <MovieListHeading heading='CariFilm.com' />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
    <div className='container-fluid movie-app'>
        <div className='row'>
          <MovieList movies={movies} />
        </div>
        <div className='row'>
				  <MovieList
					  movies={movies}
					  handleFavouritesClick={addFavouriteMovie}
					  favouriteComponent={AddFavourites}
				  />
			  </div>
			  <div className='row d-flex align-items-center mt-4 mb-4'>
				  <MovieListHeading heading='Favourites' />
        </div>
        <div className='row'>
				  <MovieList
				  	movies={favourites}
				  	handleFavouritesClick={removeFavouriteMovie}
				  	favouriteComponent={RemoveFavourites}
				  />
			  </div>
      </div>
    </>
  );
};
export default App;
