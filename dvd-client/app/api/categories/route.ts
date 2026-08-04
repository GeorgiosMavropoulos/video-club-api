//import database
import db from '@/lib/db';

//import next response + request
import { NextRequest, NextResponse } from 'next/server';
/**
 * @api {get} /movies/categories  Get All Categories
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
 *    http://localhost:4000/movies/categories
 *
 * @apiNotes
 * - This endpoint uses `DB.all()` to fetch all category rows from the database.
 * - If the table exists but is empty, the endpoint returns 404.
 * - Logs database errors to the console for debugging.
 */

//create get all categories endpoint
export async function GET(req:NextRequest)
{

     //try-catch to handle errors
        try
        {
    
            //return an error message if db is not initialized
            if(!db)
            {
                return NextResponse.json({message:'Database connection failed'},{status:500});
            }
    
            //create the statement
            const categories = db.prepare('Select * From categories').all(); //retrieve all categories
    
            //return an error message if no category exists
            if(categories.length === 0)
            {
                //return an error code
                return NextResponse.json({message:`Currently there aren't any categories available`},{status:404});
            }
    
            //if all goes well and atleast one movie exists, return it
            return NextResponse.json({message:`Success`,categories},{status:200});
    
        }catch(e: unknown)
        {
            
    
            return NextResponse.json({message:`Internal Server Error`},{status:500})
        }
    
}