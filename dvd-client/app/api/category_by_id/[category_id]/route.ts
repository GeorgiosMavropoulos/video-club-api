//Get category by id endpoint

//import categories model
import Categories from '@/models/categories.model';

import AppError from '@/errors/AppError';

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

          //use the method from category which searches the database. Class returns the errors and the catch block returns them
          const get_category = await category.GetCategoryById(category_id);

         

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




    //create put endpoint

export async function PUT(req:NextRequest, {params}:RouteContext)
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

          //create the body
          const body = await req.json();

          //declare category's name objct
          const category_name:string = body.category_name;

          //validate that category_name has been provided
          if(!category_name)
          { 
               return NextResponse.json({message:`Please provide category's name`},{status:400});
          }
         


          //create a categories object
          const category = new Categories();


          //capitalize the first letter only and add in lower case the other one unregarded what user inserts
            const formattedCategoryName =
        category_name.charAt(0).toUpperCase() + category_name.slice(1).toLowerCase();


          //use the method from category which searches the database. Class returns the errors and the catch block catches them
          const update_category = await category.UpdateCategory(category_id,formattedCategoryName);

       
          //return the success code if all gos well
          return NextResponse.json({message:`Success the category has been updated`,Categories:update_category},{status:200});

    
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

