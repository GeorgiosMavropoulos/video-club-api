//add use client to be able to create the hook
'use client'

import { useState, useEffect } from 'react'; //import useState and useEffect
//import the component
import MovieDisplay from '../../components/movieCardComponent';

//create a methos to display movies in landing page
export default function MovieGalery()
{
  //create useState variables
const [data, setData] = useState(null);
const [isLoading, setLoading] = useState(true);

//method to fetch movies
 async function GetMovies()
{
    //try-catch to handle unexpected errors
    try
    {
        //create a variable to store the fetched movies
        const movies = await fetch('http://localhost:4000/movies');

        //return an error message if failed to retrieve movies
        if(!movies.ok)
        {
          alert("Error retrieving the movies");
        }

      
        const movie_data = await movies.json();
    
           //return an error message if there aren't any movies available
        if(!movie_data.movies ||  movie_data.movies.length === 0)
        {
           alert("There aren't any movies available");
        }

         //setData
        setData(movie_data);
        //set isLoading into false
        setLoading(false);

    }catch(error)
    {
        throw new Error(`Error displaying movies:${error}`);
    }
      
}

//useeffect method to fetch the movies from the API
    useEffect(()=>{
      
         GetMovies();//call the method to fetch the movies     
        
    },[])

  //if page didn't load return loading....
 if (isLoading) return <p>Loading...</p>
  if (!data) return <p>Movies do not exist</p> //return that movies do not exist if failed to fetch data

  //return movies
  return(
     
        <main style={{ padding: "40px" }}>
      <h1>DvD Escape</h1>

     {data.movies.map((movie)=>
       
            <MovieDisplay key ={movie.id} movie={movie}/>    
             
    
    
    )}
      
     
    </main>

  )
}
