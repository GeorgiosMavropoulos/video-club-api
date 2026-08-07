
//import categories model
import Categories from '@/models/categories.model';


//import the error class
import AppError from '@/errors/AppError';
//import next response + request
import { NextRequest, NextResponse } from 'next/server';
/**
 * @api GET  * app/api/categories  Get All Categories
 * @apiName GetAllCategories
 * @apiGroup Categories
 *
 * @apiDescription
 * Returns all categories from the database.  
 * 
 * The endpoint:
 *   - Returns **200 OK** with all the categories.
 *   - Returns **404 Not Found** if no categories exist.
 *   - Returns **500 Internal Server Error** if a database error occurs.
 *
 * @apiSuccess (200 OK) {Object[]} categories                Array of category objects.
 * @apiSuccess (200 OK) {Number}  categories.category_id    Unique ID of the category.
 * @apiSuccess (200 OK) {String}  categories.category_name  Name of the category.
 *
 * @apiSuccessExample {json} Success Response (200):
 * {
 *   "categories": [
 *     {
 *       "category_id": 1,
 *       "category_name": "Action"
 *     },
 *     {
 *       "category_id": 2,
 *       "category_name": "Drama"
 *     }
 *   ]
 * }
 *
 * @apiError (404 Not Found) {String} message  No categories found.
 *
 * @apiErrorExample {json} Error Response (404):
 * {
 *   "message": "No categories found"
 * }
 *
 * @apiError (500 Internal Server Error) {String} message  database  error message.
 *
 * @apiErrorExample {json} Error Response (500):
 * {
 *   "message": "Error:SQLITE_ERROR"
 * }
 *
 * @apiExample  Example Request:
 *     *http://localhost:3000/api/categories
 *
 * @apiNotes
 * - This endpoint uses `DB.all()` to fetch all category rows from the database.
 * -Code exists in the classe's method GetAllCategoriess
 * - If the table exists but is empty, the endpoint returns 404.
 * - Logs database errors to the console for debugging.
 */

//create get all categories endpoint
export async function GET(req:NextRequest)
{

     //try-catch to handle errors
        try
        {
    
            //create categories object
            const category = new Categories();

            //execute the function to get all categories from Databse. This function handles all the errors and connection errors
            const get_categories = await category.GetAllCategories();

          

            //if all goes well, return categories object
            return NextResponse.json({message:'Success',Categories:get_categories},{status:201})
    
           
    
        }catch(e: unknown)
        {
           //handle errors coming from class methods
                  if(e instanceof AppError)
                  {
                   return NextResponse.json({message: e.message},{status: e.statusCode});
                  }
    
            return NextResponse.json({message:`Internal Server Error`},{status:500})
        }
    
}


  /**
 * @api {post} /movies/categories  Create a New Category
 * @apiName CreateCategory
 * @apiGroup Categories
 *
 * @apiDescription
 * Inserts a **new movie category** into the `categories` table.
 *  
 * Validates input and ensures that:
 * - Category name is provided and not empty
 * - Returns clear error messages for invalid input or database failures
 *
 * This endpoint enables users to add manually movie categories!.
 *
 * @apiBody {String} category_name  
 * Category`s name to insert.
 *
 * @apiSuccess (201 Created) {String} message  
 * Success message which confirms that the category was created.
 *
 * @apiSuccessExample {json} Success Response (201):
 * {
 *   "message": "Created!"
 * }
 *
 * @apiError (400 Bad Request) {String} message  
 * It's returned when category_name is  empty.
 *
 * @apiErrorExample {json} Missing Name (400):
 * {
 *   "message": "Please add a category name"
 * }
 *
 * @apiError (500 Internal Server Error) {String} message  
 * It is returned when  database errors prevent insertion.
 *
 * @apiErrorExample {json} Database Error (500):
 * {
 *   "message": "Error while trying to insert new data"
 * }
 *
 * @apiExample  Example Request:
 *http://localhost:3000/api/categories \
 *       
 *      '{"category_name": "tv show"}'
 *
 * @apiNotes
 * - Category names are **not validated for uniqueness**. Duplicate categories may be created unless the DB enforces constraints.
 *
 * - Successful insertion returns **201 Created**.
 */
//create a new category endpoint (POST)
export async function POST(req:NextRequest) 
{
    //try catch block to handle errors
    try
    {
          //create the body
          const body = await req.json();


    const category_name:string = body.category_name;

    //return an error message if category name has not been given
    if(!category_name)
    {
        return NextResponse.json({message:`Please provide category's name`},{status:400});
    }

    //create a categories object
    const category = new Categories()

    //capitalize the first letter only and add in lower case the other one unregarded what user inserts
    const formattedCategoryName =
  category_name.charAt(0).toUpperCase() + category_name.slice(1).toLowerCase();

    //createc category
    const create_category = await category.CreateCategory(formattedCategoryName);

    //return a response if all goes well
    return NextResponse.json({message:`Success the category ${formattedCategoryName} has been created`,create_category},{status:200});

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

