//add use client to be able to create the hook
'use client'
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react'; //import useState and useEffect

//import the component to display movie cards
import MovieDisplay from '../../../components/movieCardComponent';

//create a new interface
interface MovieData {
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
  movies: MovieData[];
}

//method to display movies by category
export default function DisplayMoviesByCategory(){
      //create useState variables
const [data, setData] = useState<MovieResponse | null>(null);
const [isLoading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);//log error messages

const params = useParams();

//method to fetch movies
async function FetchByCategory(){
    //try-catch method to implement error handling

    try {
        
        const category_name = params.category_name;//retrieve the category's name from the url
        //fetch the movies
        const movies_by_category = await fetch(`http://localhost:4000/movies/categories/${category_name}`);

        //throw an error if category does not exist
        if(!movies_by_category.ok)
        {
            throw new Error("Error. Category does not exist");
            
        }


        //mutate data into json format
        const movies = await movies_by_category.json();

        //throw an error if category does not contain any movies
        if(! movies || movies.length === 0)
        {
              throw new Error("There aren't any movies available under this category");
        }

        
        
        //set data if all goes well
        setData(movies);
        console.log(data);
    } catch (error) {
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

 FetchByCategory();
}, [params.category_name])


//if page didn't load return loading....
 if (isLoading) return <p>Loading...</p>

   //if there is an error
if (error) return <p className="error">{error}</p>
  if (!data) return <p>Movies do not exist</p> //return that movies do not exist if failed to fetch data
  
  //create the html elements
  return(
           

             
               <main className="mt-20 " style={{ padding: "40px" }}>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {data?.movies?.map((movie)=>
            <MovieDisplay key={movie.id} movie={movie}/>
         )}
    
    </div>

                </main>

               

  )
}