//component to display the editable movie's form
'use client';
import React from 'react';
import Image from 'next/image';

//create movie's interaface
//create a new interface
interface Props {
     movie: {
    id: number;
    category_id: number;
    title: string;
    director: string;
    date: string;
    plot: string;
    genre: string;
    image: string;
  };

};

//create the method to display the component
const EditMovieFormComponent = ({ movie }: Props) =>{

    //RETURN method
    return(
           <form  className="flex flex-col gap-4 max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Update Movie</h2>

       {/*Movie's image*/}
            <div className="relative w-full aspect-[2/3] overflow-hidden">
              <Image
                src={`http://localhost:4000${movie.image}`}
                alt={movie.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              </div>

      <div className="flex flex-col gap-1">
        <label  className="text-sm font-medium text-gray-700">{movie.title}</label>
        <input 
          id="title"
          name="title" 
          type="text" 
           placeholder={movie.title}
          required 
          className="border p-2 rounded-md focus:outline-blue-500 text-gray-900"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">{movie.id}</label>
        <input 
          id="movie.id"
          name="movie.id" 
          required 
          placeholder="{movie.id}"
          className="border p-2 rounded-md focus:outline-blue-500 text-gray-900"
        />
      </div>

        <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">{movie.director}</label>
        <input 
          id="movie.director"
          name="movie.director" 
          required 
          placeholder={movie.director}
          className="border p-2 rounded-md focus:outline-blue-500 text-gray-900"
        />
      </div>

      
        <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">{movie.date}</label>
        <input 
          id="movie.date"
          name="movie.date" 
          required 
          placeholder={movie.date}
          className="border p-2 rounded-md focus:outline-blue-500 text-gray-900"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">{movie.plot}</label>
        <textarea
          id="movie.plot"
          name="movie.plot" 
          required 
          placeholder={movie.plot}
          className="border p-2 rounded-md focus:outline-blue-500 text-gray-900"
        />
      </div>

      
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">{movie.genre}</label>
        <textarea
          id="movie.genre"
          name="movie.genre" 
          required 
          placeholder={movie.genre}
          className="border p-2 rounded-md focus:outline-blue-500 text-gray-900"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
        Update Movie
      </button>


     
    </form>
    );

};

//export the component
export default EditMovieFormComponent;