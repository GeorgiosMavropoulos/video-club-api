//add use client to be able to create the hook
'use client'

import { useState, useEffect } from 'react'; //import useState and useEffect
//searchMovie function which activates the search function in search bar

export default function useMovieSearch()
 
{

    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);//log error messages

    //search movie function
   async function searchMovie(value)
{
    console.log(value);
  //try-catch for error handling
  try
  {
      setLoading(true); //setting loading into true
    //fetch the movie
   const movie = await fetch(`http://localhost:4000/movies/title/${value}`);

   //return an error message if title is empty
   if(!movie.ok)
   {
     throw new Error(`Please insert movie's title`);
   }

    //create a json object
    const returned_movie = await movie.json();

    //return an error message if movie does not exist
    if(!returned_movie)
    {
        throw new Error(`The movie with title:${value} does not exist`);
    }

    //if all goes well return the movie
    
     setMovies(returned_movie.movie);

  }catch(error)
  {
     if( error instanceof Error)
        {
               setError(error.message);
        }
  }
  finally
  {
     setLoading(false);
  }

 
   
}
//return the hook
 return{
    searchMovie,
    movies,
    loading,
    error

  };
}
