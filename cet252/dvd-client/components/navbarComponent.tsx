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
         
<nav className="bg-neutral-secondary-soft fixed w-full z-20 top-0 start-0 border-b border-default">
  <div classclassName="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Flowbite Logo" />
       
    </a>
    <button data-collapse-toggle="navbar-solid" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-solid" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-solid">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-secondary-soft">
        
         
            {data.categories.map((category)=> 
                <li key={category.category_id} >
                    <a href={`/category/${category.category_id}`} className="block py-2 px-3">
                    {category.category_name}
                        </a>
                    
                    </li>)}
         
      
      
      </ul>
    </div>
  </div>
</nav>

        
    )
}