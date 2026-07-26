// Create Navbar


//add use client to be able to create the hook
'use client'

import { useState, useEffect } from 'react'; //import useState and useEffect


//function to create the html elements
 export default function DisplayNavigationBar()
{

   //create state variables
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);//log error messages
    //try-catch method to handle unexpected errors

//method to create navigation bar by fetching all data from backend
async function FetchCategoriesForNavBar(){
   
    try {
        
        //fetch categories
        const all_categories = await fetch('http://localhost:4000/movies/categories');
        
          //throw an error if server does not respond
          if(!all_categories.ok)
          {
            throw new Error('Error.Please try again later');
            console.log('Server does not respond');
          }


        //return an error message if server does not respond
        const categories = await all_categories.json()
        //return an exception if categories does not exist
        if(!categories || categories.length ===0)
        {
            throw new Error(`There aren't any categories available`);
            
        }

        //if all goes well setData
        setData(categories);


    } catch (error) {
           if(error instanceof Error){
        setError(error.message);
    }
    }
    finally
    {
        setLoading(false);
    }
}


//useEffect method to create a hook
useEffect(()=>{
     //call the method to fetch the categories
     FetchCategoriesForNavBar();
},[])
    //if page didn't load return loading....
 if (isLoading) return <p>Loading...</p>

   //if there is an error
if (error) return <p className="error">{error}</p>
  if (!data) return <p>Movies do not exist</p> //return that movies do not exist if failed to fetch data
    //create the UI elements
    return(
         
<nav className="h-25 bg-[#0b0b0b] fixed w-full z-50 top-0 border-b border-yellow-700">
  <div className="max-w-screen-xl h-full flex items-center mx-auto px-4">


    
    {/*logo */}
    <a 
      href="http://localhost:3000/movies_gallery"
      className="text-yellow-400 font-bold text-2xl mr-12"
    >
      DVD ESCAPE
    </a>


    {/*categories */}
    <ul className="flex items-center space-x-8">
      {data.categories.map((category) => (
        <li key={category.category_id}>
          <a
            href={`/category/${category.category_name}`}
            className="font-bold text-xl tracking-wider text-gray-200 hover:text-yellow-400 transition"
          >
            {category.category_name}
          </a>
        </li>
      ))}
    </ul>
    {/*search bar*/}
     <form class="max-w-md mx-auto">   
    <label for="search" class="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
    <div class="relative">
        
        <input type="search" id="search" class="w-64
    bg-[#132B4F]
    text-[#F5E6CC]
    placeholder:text-slate-400
    border border-slate-600
    rounded-full
    m-0.5
    px-4 py-2
    focus:outline-none
    focus:ring-2
    focus:ring-[#D4AF37]" placeholder="Search" required />
        <button type="button" class="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-blue-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">Search</button>
    </div>
</form>

  </div>
</nav>

        
    )
}