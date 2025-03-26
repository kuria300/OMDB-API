import React from 'react'

const MovieCard = ({ movie: {Title, Poster, Year, Released, imdbRating, language} }) => {
  return (
    <div className='movie-card'>
        <img  src={Poster !== "N/A" ? Poster : "./no-movie.png"}
        alt={Title} 
        />

        <div className='mt-4'>
           <h3>{Title}</h3>
        </div>

        <div className='content'>
            <div className='rating'>
               <img src='star.svg' alt='star icon' />
               <p>{imdbRating ? imdbRating : 'N/A' }</p>
            </div>
            <span>.</span>
            <p className='lang'>{language}</p>

            <span>.</span>
            <p className='year'>{Year}</p>
        </div>
    </div>
    
  )
}

export default MovieCard