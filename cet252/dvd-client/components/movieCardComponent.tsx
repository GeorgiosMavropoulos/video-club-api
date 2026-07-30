//js and react code for UI component

import Image from "next/image";
//import edit btn component
import EditButtonComponent from "./EditButtonComponent";

//create item's interface. the shape of the data
interface MovieProps {
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
}

//function to display the html elements
export default function MovieDisplay({ movie }: MovieProps) {
  //create the UI elements
  return (
    ///implement tailwind class names
    <div className="group max-w-sm overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-2xl hover:shadow-black/60">
      
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

        {/* subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

        {/* genre badge floating over the image */}
        <span className="absolute top-3 right-3 rounded-full bg-amber-400/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-sm">
          {movie.genre}
        </span>
      </div>

      {/* Movie's title & info */}
      <div className="flex flex-col gap-2 p-5">
        <h1 className="text-lg font-bold leading-tight text-slate-50 line-clamp-1">
          {movie.title}
        </h1>

        {/* director + date on one line */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="truncate">🎬 {movie.director}</span>
          <span className="shrink-0 rounded-md bg-slate-800 px-2 py-0.5 text-slate-300">
            {movie.date}
          </span>
        </div>

        {/* divider */}
        <hr className="my-1 border-slate-800" />

        {/* Movie's plot */}
        <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">
          {movie.plot}
        </p>

        {/*Display edit button */}
        <EditButtonComponent id={movie.id}/>
      </div>

     
    </div>
  );
}

