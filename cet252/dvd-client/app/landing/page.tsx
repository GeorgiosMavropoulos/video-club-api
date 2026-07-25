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
const [error, setError] = useState<string | null>(null);//log error messages

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
          throw new Error("Error retrieving the movies");
        }

      
        const movie_data = await movies.json();

        console.log(movie_data);//log data for debugging
    
           //return an error message if there aren't any movies available
        if(!movie_data.movies ||  movie_data.movies.length === 0)
        {
           throw new Error("There aren't any movies available");
        }

         //setData
        setData(movie_data);
        

    }catch(error)
    {
        setError(error.message);
       
    }
     finally
  {
    
    setLoading(false);
  }
      
}

//useeffect method to fetch the movies from the API
    useEffect(()=>{
      
         GetMovies();//call the method to fetch the movies     
        
    },[])

  //if page didn't load return loading....
 if (isLoading) return <p>Loading...</p>

   //if there is an error
if (error) return <p className="error">{error}</p>
  if (!data) return <p>Movies do not exist</p> //return that movies do not exist if failed to fetch data

  

  //return movies
  return(
     
        <main className="mt-20" style={{ padding: "40px" }}>
      
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {data.movies.map((movie)=>
       
            <MovieDisplay key ={movie.id} movie={movie}/>    
             
    
    
    )}

</div>
   

    
      
     
    </main>

  )
}
