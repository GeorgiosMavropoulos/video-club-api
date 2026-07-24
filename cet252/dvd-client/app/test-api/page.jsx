
'use client'
import { useState, useEffect } from 'react' //import useEffect and useState 

 export default  function MovieGalleryFetch(){

    //create 2 state variables
      const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  //useEffect method to fetch data from the api
  useEffect(() =>{
   
    //function to get the movies
    async function GetMovies(){
     //fetch data from the API
     const all_movies = await fetch('http://localhost:4000/movies');
     const movies = await all_movies.json();
     setData(movies);
     setLoading(false);
    }
   GetMovies();//call function
   



  },[])

  //set page to loading.. if no data is available
if(isLoading) return <p> Loading.... </p>
if(!data) return <p> There aren't any movies available right now</p>

//return movies if everything was okay
return(
   
    <ul>
         {data.movies.map((data)=>(
            <li key ={data.id}> {data.title}  </li>  ))}
        
        
      
    
        </ul>
)

}


