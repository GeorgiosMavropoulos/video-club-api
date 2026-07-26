//search bar component 

//add use client to be able to create the hook
'use client'

import { useState, useEffect } from 'react'; //import useState and useEffect

import useMovieSearch from '../hooks/useMovieSearch'; //import searchMovie method

 //method to display the search bar and implement functionality
 export default function SearchBar()
 {

    //create use state variables
    const [value, setValue] = useState('');
 
    //create a variable to store useMovieSearch's function
    const {searchMovie} = useMovieSearch();


    //create the UI elements
            return(
                <>
                {/*search bar*/}
            <form className="max-w-md mx-auto">   
            <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
            <div className="relative">
                
            <input type="search" id="search" className="w-64
            bg-[#132B4F]
            text-[#F5E6CC]
            placeholder:text-slate-400
            border border-slate-600
            rounded-full
            m-0.5
            px-4 py-2
            focus:outline-none
            focus:ring-2
            focus:ring-[#D4AF37]" placeholder="Search" onChange={(e)=>setValue(e.target.value)} required />
            <button type="button" className="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-blue-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none" onClick={() =>searchMovie(value)}>Search</button>
            </div>
        </form>
         </>
    )
 }