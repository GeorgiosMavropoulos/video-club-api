'use client'//client side

mport { useState, useEffect } from 'react'; //import useState and useEffect
//import the component
import MovieDisplay from '../../components/EditMovieComponent';

//create the function to display the page
export default function EditMoviePage(){


      //create useState variables
const [data, setData] = useState(null);
const [isLoading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);//log error messages

//function to fetch the movie
async function FetchMovie()
{
    //delegate a variable to store the fetched movie
    const {movie} = await fetch(`http://localhost:3000/movies/${id}`)
}

}