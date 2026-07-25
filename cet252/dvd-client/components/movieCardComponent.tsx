//js and react code for UI component



 //create item's interface. the shape of the data
 interface MovieProps{
    movie:{
        id: number;
        category_id: number;
        title: string;
        director: string;
      date: string;
      plot: string;
      genre: string;
      image: string;

    };
 }

 //function to display the html elements
 export default function MovieDisplay({movie}:MovieProps){
console.log(movie.image);
    //create the UI elements
    return (
    
        ///implement tailwind class names
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white p-4">
            
            {/*Movie's image*/}
             <div className="w-full h-48 overflow-hidden rounded-t-lg bg-gray-100">
        <img 
          src={`http://localhost:4000${movie.image}`} 
          alt={movie.title} 
           className="w-full h-48 overflow-hidden rounded-t-lg bg-gray-100"
          
        />


      </div>
           
            {/* Movie's title*/}
           <div className="pt-4">
        {/* Typography classes for font size, weight, and colors */}
        <h1 className="text-xl font-bold text-gray-900 mb-2 truncate">
          {movie.title}
        </h1>

        {/* Movie's plot */}
         <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {movie.plot}
        </p>


        {/*Movie's director*/}
         <h1 className="text-sm text-gray-600 line-clamp-3 mb-4">
          {movie.director}
        </h1>

         {/*Movie's genre*/}
         <h1 className="text-sm text-gray-600 line-clamp-3 mb-4">
          {movie.genre}
        </h1>


          {/*Movie's date*/}
         <h1 className="text-sm text-gray-600 line-clamp-3 mb-4">
          {movie.date}
        </h1>
        </div>
                </div>

    )
 }


