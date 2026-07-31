'use client'//client side

import { useState, useEffect } from 'react'; //import useState and useEffect
//import useParams method
import { useParams } from 'next/navigation';

import EditMovieFormComponent from '@/components/EditMovieFormComponent';

interface Movie {
  id: number;
  category_id: number;
  title: string;
  director: string;
  date: string;
  plot: string;
  genre: string;
  image: string;
}

interface MovieResponse {
  movie: Movie[];
}
//create the function to display the page
export default function EditMoviePage(){

const params = useParams();
console.log(params)


      //create useState variables
const [data, setData] = useState<MovieResponse | null>(null);
const [isLoading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);//log error messages
//fetch id from the params
 const  movie_id  = params.movie_id;

//function to fetch the movie
async function FetchMovie()
{

    //try catch to handle errors
    try
    {
           //delegate a variable to store the fetched movie
        const movie = await fetch(`http://localhost:4000/movies/${movie_id}`)


          //throw an error if movie does not exist
        if(!movie.ok)
        {
            throw new Error("Error. Cannot retrieve the movie. Try again later.");
            
            
        }

        //mutate data into json format
        const fetched_movie = await movie.json();

        console.log(data)

        //return an error message if movie does not exist
        if(!fetched_movie.movie || fetched_movie.movie.length ===0)
        {
            throw new Error("Error.Movie does not exist.");
          
        }
         

        //set data if all goes well
        setData(fetched_movie);

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
  //useEffect method to display the movies
 useEffect(()=>{
  //call the function to get the movies

  FetchMovie();
}, [params.movie_id])


//if page didn't load return loading....
 if (isLoading) return <p>Loading...</p>

   //if there is an error
if (error) return alert(`${error}`)
  if (!data) return <p>Movies do not exist</p> //return that movies do not exist if failed to fetch data

// return the jsx
return(

      <main className="mt-20 " style={{ padding: "40px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            <EditMovieFormComponent movie={data.movie[0]} /> 
            
        </div>
        
        <div>
            
        </div>
      </main>
);

}