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
            console.log(categories);
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
         
<nav className="bg-green-600 fixed w-full z-50 top-0 start-0 border-b border-default">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
  
    <div className="hidden w-full md:block md:w-auto" id="navbar-solid">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-secondary-soft">
        
         
            {data.categories.map((category)=> 
                <li key={category.category_id} >
                    <a href={`/category/${category.category_id}`} className="block text-center py-2 px-3 font-bold text-xl tracking-wider bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                    {category.category_name}
                        </a>
                    
                    </li>)}
         
      
      
      </ul>
    </div>
  </div>
</nav>

        
    )
}