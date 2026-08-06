
//import categories model
import Categories from '@/models/categories.model';

//import next response + request
import { NextRequest, NextResponse } from 'next/server';

//create an interface to store the parameter's type in order to provide a promise in TS 
interface RouteContext {
  params: Promise<{ category_name: string }>
}



/**
 * @api {get} /api/categories/:category_name Get Category by Name
 * @apiName GetCategoryByName
 * @apiGroup Categories
 *
 * @apiDescription
 * Retrieves a category from the database using its name.
 * The first character of the category name is converted to uppercase
 * and all remaining characters are converted to lowercase.
 *
 * Example:
 * "comedy" -> "Comedy"
 * "COMEDY" -> "Comedy"
 *
 * @apiParam {String} category_name
 * The name of the category to search for.
 *
 * @apiSuccess {String} message
 * Returns "Success" when the request is processed successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Success"
 * }
 *
 * @apiError {String} message
 * Category name was not provided.
 *
 * @apiErrorExample {json} Missing-Category:
 * HTTP/1.1 400 Bad Request
 * {
 *   "message": "Please provide category's name"
 * }
 *
 * @apiError {String} message
 * Category was not found.
 *
 * @apiErrorExample {json} Category-Not-Found:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "The category Comedy does not exists"
 * }
 *
 * @apiError {String} message
 * An internal server error occurred.
 *
 * @apiErrorExample {json} Server-Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "Internal server error"
 * }
 */

//get category by its name endpoint
export async function GET(req:Request, { params }: RouteContext)
{
    //try-catch for error handling
    try
    {

         // Await the params object to resolve it
          const resolvedParams = await params;

         

          //create the category_name object to store value from the url
          const category_name = resolvedParams.category_name;
          
           //return an error message if category name has not been provided
          if(!category_name )
          {
             return NextResponse.json({message:`Please provide category's name`},{status:400});
          }

          //create a categories object
          const category = new Categories();

           //capitalize the first letter only and add in lower case the other one unregarded what user inserts
    const formattedCategoryName =
      category_name.charAt(0).toUpperCase() + category_name.slice(1).toLowerCase();
          //use the method from category which searches the database
          const get_category = category.GetCategoryByName(formattedCategoryName);

          //return an error message if category does not exists
          if(!get_category)
          {
            return NextResponse.json({message:`The category ${formattedCategoryName} does not exists`},{status:404})
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

