import React, { useEffect, useState } from 'react'
import { useDebounce } from 'react-use';
import Search from './components/search'
import Spinner from './components/spinner';
import MovieCard from './components/movieCard';

const API_KEY = process.env.VITE_OMDB_API_KEY || import.meta.env.VITE_OMDB_API_KEY;
const API_BASE_URL= `https://www.omdbapi.com/?apikey=${API_KEY}`

function App() {
const [search, setSearch] = useState('');
const [movies, setMovies] = useState([]);
const [errorMessage, setErrorMessage] = useState('');
const [isLoading, setIsLoading]= useState(false);
const [debouncedValue, setDebouncedValue] = useState('')

useDebounce(()=>{setDebouncedValue(search)}, 1000, [search])

const fetchMovieDetails = async (movieID) => {
  try {
    const response = await fetch(`${API_BASE_URL}&i=${movieID}`);
    const data = await response.json();
    return {
      imdbRating: data.imdbRating || 'N/A',
      language: data.Language || 'Unknown',
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};
const fetchMovies = async(query='')=>{
 setIsLoading(true);
 setErrorMessage('');
  try{
    const endpoint = `${API_BASE_URL}&s=${encodeURIComponent(query)}`;
   const response= await fetch(endpoint);

   if(!response.ok){
    throw new Error('Failed to Fetch movies')
   }
    const data= await response.json();
    if (data.Response === "True") {
      const moviesWithRatings = await Promise.all(
        data.Search.map(async (movie) => {
          const {imdbRating, language} = await fetchMovieDetails(movie.imdbID);
          return { ...movie, imdbRating, language }; 
        })
      )
      setMovies(moviesWithRatings);
      setErrorMessage('');
    }else{
     setErrorMessage(data.Error);
     setMovies([]);
    }
   
  }catch(error){
    console.error(`Error fetching Movies: ${error}`);
    setErrorMessage(error||'Error fetching Movies, Please try again Later');
  } finally{
    setIsLoading(false)
  }
}
useEffect(()=>{
 
    fetchMovies(debouncedValue || 'ratatouille');
}, [debouncedValue])
 return(
    <main>
       <div className="pattern min-h-screen flex justify-center">
        <div className="wrapper">
          <header>
            <img src='hero.png' alt='hero banner'  className="mt-[100px] w-[400px] h-auto mx-auto"/>
            <h1 className='mx-auto max-w-3xl text-center text-4xl font-bold leading-tight tracking-[-1%] text-white sm:text-[64px] sm:leading-[76px]'>
              Find <span className="text-gradient">Movies</span> you'll Enjoy Without the Hassle
            </h1>

            <Search search={search} setSearch={setSearch}/>
          </header>

          <section className='all-movies'>
              <h2 className='mt-[40px] font-bold text-2xl m-4'>All Movies</h2>

              {isLoading ? (<Spinner />) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>): (
                <ul>
                  {movies.map((movie)=>(
                    <MovieCard key={movie.imdbID} movie={movie} />
                  ))}
                </ul>
              )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
