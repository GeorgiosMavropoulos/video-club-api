//Get category by id endpoint

//import categories model
import Categories from '@/models/categories.model';

//import next response + request
import { NextRequest, NextResponse } from 'next/server';

//create an interface to store the parameter's type in order to provide a promise in TS 
interface RouteContext {
  params: Promise<{ category_id: number;}>
}




/**
 * @api {get} /api/category_by_id/:category_id Get Category by ID
 * @apiName GetCategoryById
 * @apiGroup Categories
 *
 * @apiDescription
 * Retrieves a category from the database using its unique ID.
 *
 * @apiParam {Number} category_id
 * The unique ID of the category to retrieve.
 *
 * @apiSuccess {String} message
 * Returns "Success" when the category is found.
 *
 * @apiSuccess {Object} Categories
 * The category retrieved from the database.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Success",
 *   "Categories": {
 *     "category_id": 1,
 *     "category_name": "Comedy"
 *   }
 *
 * @apiError {String} message
 * Category ID was not provided.
 *
 * @apiErrorExample {json} Missing-ID:
 * HTTP/1.1 400 Bad Request
 * {
 *   "message": "Please provide category's id"
 * }
 *
 * @apiError {String} message
 * No category exists with the provided ID.
 *
 * @apiErrorExample {json} Category-Not-Found:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "The category with id 1, does not exist"
 * }
 *
 * @apiError {String} message
 * An internal server or database error occurred.
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
