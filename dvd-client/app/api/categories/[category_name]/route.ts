
//import categories model
import Categories from '@/models/categories.model';

//import next response + request
import { NextRequest, NextResponse } from 'next/server';

//import the error class
import AppError from '@/errors/AppError';
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

         // get the params objct
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
          const get_category = await category.GetCategoryByName(formattedCategoryName);

          

          //if category exists return the successful response
          return NextResponse.json({message:'Success',Categories:get_category},{status:200});

    }catch(e)
    {
       //handle errors coming from class methods
              if(e instanceof AppError)
              {
               return NextResponse.json({message: e.message},{status: e.statusCode});
              }

        return NextResponse.json({message: `Internal server error`},{status:500});
    }
    }



    /**
 * @api {delete} /api/cateogories/:category_name Delete a Category by its name
 * @apiName DeleteCategory
 * @apiGroup Categories
 *
 * @apiDescription
 * Deletes a specific category from the `categories` table using its category_name.
 *
 * The endpoint validates:
 * - If the category_name  provided is valid
 * - If the category exists before gets deleted
 *
 *
 * @apiParam (URL Path) {String} category_name  
 * The name of the category you want to delete.
 *
 *
 * @apiSuccess (200 OK) {String} message  
 * Success message indicating the category was deleted.
 *
 * @apiSuccessExample {json} Success Response (200):
 * {
 *   "message": "Success the category:tv show has been deleted"
 * }
 *
 *
 * @apiError (400 Bad Request) {String} message  
 * It is returned when the category_name is missing or invalid.
 *
 * @apiErrorExample {json} Invalid category_name (400):
 * {
 *   "message": "Please specify the category name you wish to delete"
 * }
 *
 *
 * @apiError (404 Not Found) {String} message  
 * It is returned when no category exists with the specified category_name.
 *
 * @apiErrorExample {json} Category Not Found (404):
 * {
 *   "message": "The category:sitcom does not exists"
 * }
 *
 *
 * @apiError (500 Internal Server Error) {String} message  
 * It is returned when a database error occurs while trying to delete.
 *
 * @apiErrorExample {json} Database Error (500):
 * {
 *   "message": "Error deleting the category :tv show"
 * }
 *
 *
 * @apiExample  Example Request:
 *  http://localhost:3000/api/categories/Comedy
 *
 *
 * @apiNotes
 * - Uses `this.changes` provided  to verify
 *   whether a row was deleted or not.
 * - It returns a very clean,  message for each failure.
  */


    //create delete category endpoint
export async function DELETE(req:NextRequest,{params}:RouteContext)
{

  //try-catch for error handling
    try
    {

       // get the params objct
          const resolvedParams = await params;

         

          //create the category_name object to store value from the url
          const category_name = resolvedParams.category_name;

          //format the name to get accepted in DBs format


            //return an error message if category name has not been provided
          if(!category_name )
          {
             return NextResponse.json({message:`Please provide category's name`},{status:400});
          }



            //capitalize the first letter only and add in lower case the other one unregarded what user inserts
    const formattedCategoryName =
      category_name.charAt(0).toUpperCase() + category_name.slice(1).toLowerCase();

          //create a categories object
          const category = new Categories();


          //call the method to delete the object
         await category.DeleteCategory(formattedCategoryName);

          //return success if all goes well. However, if something goes wrong, backend will return an error message. The error msg from backend is being caught in catch block
          return NextResponse.json({message:`The category:${formattedCategoryName} has been deleted with success`,Categories:category},{status:200})




    }catch(e)
    {
    //handle errors coming from class methods
        if(e instanceof AppError)
         {
          return NextResponse.json({message: e.message},{status: e.statusCode});
         }

         //return a general server error for unexpected errors
          return NextResponse.json({message: `Internal server error`},{status:500});


    }

}

