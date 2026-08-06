//Get category by id endpoint

//import categories model
import Categories from '@/models/categories.model';

//import next response + request
import { NextRequest, NextResponse } from 'next/server';

//create an interface to store the parameter's type in order to provide a promise in TS 
interface RouteContext {
  params: Promise<{ category_id: number;}>
}


//get category by its name endpoint
export async function GET(req:Request, { params }: RouteContext)
{
    //try-catch for error handling
    try
    {

         // Await the params object to resolve it
          const resolvedParams = await params;

       
          //create the category_name object to store value from the url
          const category_id = resolvedParams.category_id;

          if(!category_id)
          {
             return NextResponse.json({message:`Please provide category's id`},{status:400});
          }
         


          //create a categories object
          const category = new Categories();

          //use the method from category which searches the database
          const get_category = category.GetCategoryById(category_id);

          //return an error message if category does not exists
          if(!get_category)
          {
            return NextResponse.json({message:`The category with id ${category_id}, does not exist`},{status:404})
          }

          //if category exists return the successful response
          return NextResponse.json({message:'Success',Categories:get_category},{status:200});

    }catch(e)
    {
        //handle errors coming from class methods
       if(e instanceof Error)
       {
        return NextResponse.json({message: e.message},{status:500});
       }

        return NextResponse.json({message: `Internal server error`},{status:500});
    }
    }
