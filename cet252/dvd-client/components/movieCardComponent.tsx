//js and react code for UI component

import Image from "next/image";

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

    //create the UI elements
    return (
    
        ///implement tailwind class names
            <div className="max-w-sm overflow-hidden rounded-xl border border-slate-700 bg-[#1e293b] shadow-xl">
            
            {/*Movie's image*/}
             <div className="relative w-full aspect-[2/3]">
        <Image
          src={`http://localhost:4000${movie.image}`} 
          alt={movie.title} 
          fill
          
          unoptimized
          sizes="(max-width: 768px) 100vw, 384px"
           className="object-cover object-top rounded-t-xl"
          
        />


      </div>
           
            {/* Movie's title*/}
           <div className="p-4 ">
        {/* Typography classes for font size, weight, and colors */}
        <h1 className="text-[#F8FAFC] font-bold mb-2">
          {movie.title}
        </h1>

        {/* Movie's plot */}
         <p className="text-sm text-slate-400 line-clamp-3 mb-4">
          {movie.plot}
        </p>


        {/*Movie's director*/}
         <h1 className="text-sm text-slate-300 line-clamp-3 mb-4">
          {movie.director}
        </h1>

         {/*Movie's genre*/}
         <h1 className="text-sm text-amber-400 line-clamp-3 mb-4">
          {movie.genre}
        </h1>


          {/*Movie's date*/}
         <h1 className="text-sm text-slate-300 line-clamp-3 mb-4">
          {movie.date}
        </h1>
        </div>
                </div>

    )
 }


 //method to display movies by category



