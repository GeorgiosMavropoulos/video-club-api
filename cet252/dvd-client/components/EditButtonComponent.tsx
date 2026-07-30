//code for edit movie btn component
//import react
import React from 'react';
import Link from "next/link";

//create a props interface to get all movie's data
interface Props{
    
    id: number;
   
 
}
//create EditButtonComponent function
const EditButtonComponent = ({id}:Props)=>{


    //jsx code to return the component
    return(
        

      <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
     
      
        <Link href={`/movies/edit/${id}`}>
         <button 
     className="px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-amber-950 bg-gradient-to-r from-amber-400 via-gold to-yellow-500 hover:from-amber-300 
     hover:to-yellow-400 active:scale-95 rounded-full shadow-lg shadow-amber-500/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        Edit
     

       
        </button> 
        </Link>
      </div>
      

    );


};

//export the component
export default EditButtonComponent;