//add use client to be able to create the hook
'use client'
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react'; //import useState and useEffect

//import the component to display movie card
import MovieDisplay from '../../../components/movieCardComponent';

import useMovieSearch from '../../../hooks/useMovieSearch';//import hook

//function to display the movie's page
export default function DisplayMoviePage(){



const params = useParams();

    //create a variable to delegate searched movie's name
    const movie = params.searched_movie;

    //give movie's name in the hook the function can search for this movie
    const {movies, error , loading} = useMovieSearch(movie);
    console.log(movie);

    //create ui elements
    return(

        <main>

        {loading && <p>Loading...</p>}

     {error && <p>{error}</p>}
     
     <>
     {/*Call movieCard component to display the movie*/}
             <main className="mt-20 " style={{ padding: "40px" }}>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {movies.map((movie)=>
            <MovieDisplay key={movie.id} movie={movie}/>
         )}
    
    </div>

                </main>
     </>
     </main>
    )
    

}