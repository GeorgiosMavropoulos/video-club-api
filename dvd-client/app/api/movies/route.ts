//import database
import db from '@/lib/db';

//import next response + request
import { NextRequest, NextResponse } from 'next/server';

//import movie model
import MovieModel from '../../../models/movie.model';

/*
**
 * @api {get} /movies  Get All Movies
 * @apiName GetAllMovies
 * @apiGroup Movies
 *
 * @apiDescription
 * Retrieves all movies from the database.
 *  
 * The endpoint:
 *   - Returns HTTP **200 OK** with a JSON list of movies.
 *   - Returns HTTP **404 Not Found** if no movies exist.
 *   - Returns HTTP **500 Internal Server Error** for database errors.
 *
 * @apiSuccess (200 OK) {Object[]} movies                  Array of movie objects.
 * @apiSuccess (200 OK) {Number} movies.id                 Movie unique ID.
 * @apiSuccess (200 OK) {Number} movies.category_id        Category ID referencing `categories` table.
 * @apiSuccess (200 OK) {String} movies.title              Movie title.
 * @apiSuccess (200 OK) {String} movies.director           Movie director.
 * @apiSuccess (200 OK) {String} movies.date               Release date.
 * @apiSuccess (200 OK) {String} movies.plot               Short plot summary.
 * @apiSuccess (200 OK) {String} movies.genre              Genre/category name.
 * @apiSuccess (200 OK) {String} movies.image              Image URL/path.
 *
 * @apiSuccessExample {json} Response Example (200):
 * {
 *   "movies": [
 *     {
 *       "id": 2,
 *       "category_id": 1,
 *       "title": "Superbad",
 *       "director": "Greg Mottola",
 *       "date": "2008",
 *       "plot": "Two high school buddies try to make the most of their last days before graduation.",
 *       "genre": "Comedy",
 *       "image": "/uploads/superbad.jpeg"
 *     }
 *   ]
 * }
 *
 * @apiError (404 Not Found) {String} message   No movies found in the database.
 *
 * @apiErrorExample {json} Response Example (404):
 * {
 *   "message": "Cannot find any movies"
 * }
 *
 * @apiError (500 Internal Server Error) {String} message  Database error.
 *
 * @apiErrorExample {json} Response Example (500):
 * {
 *   "message": "Error while trying to retrieve all movies"
 * }
 *
 * @apiExample  Example Request:
 *  GET http://localhost:3000/movies
 *
 * @apiNotes
 * - This endpoint uses `db.prepare('Select * From movies').all();` to fetch all rows from the database.
 * - Even if 1 movie exists, it returns 200.
 * - If the database table is empty, a 404 status is returned.
 */

//create get all movies endpoint
export async function GET(req:NextRequest)
{

    //create a movie model object
    const movie_obj = new MovieModel()
    //try-catch to handle errors
    try
    {

        //return an error message if db is not initialized
        if(!db)
        {
            return NextResponse.json({message:'Database connection failed'},{status:500});
        }

        //create the statement
        const movies = movie_obj.GetAllMovies(); //retrieve all movies

        //return an error message if no movie exists
        if(movies.length === 0)
        {
            //return an error code
            return NextResponse.json({message:`Currently there aren't any movies available`},{status:404});
        }

        //if all goes well and atleast one movie exists, return it
        return NextResponse.json({message:`Success`,Movie:movies},{status:200});

    }catch(e: unknown)
    {
        

        return NextResponse.json({message:`Internal Server Error`},{status:500})
    }

}


