//import database
import db from '@/lib/db';

//import next response + request
import { NextRequest, NextResponse } from 'next/server';

//import movie model
import MovieModel from '../../../models/movie.model';

//import the error class
import AppError from '@/errors/AppError';


//create a type of movie body since I am going to need it to create the PUT and POST endpoints
type MovieBody = {
    category_id: number;
    title: string;
    director: string;
    date: string;
    plot: string;
    genre: string;
    image: string;
};


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

      
        //create the statement. Backend handles all the errors and catch block returns them
        const movies = await movie_obj.GetAllMovies(); //retrieve all movies

        

        //if all goes well and atleast one movie exists, return it
        return NextResponse.json({message:`Success`,Movie:movies},{status:200});

    }catch(e: unknown)
    {
          if (e instanceof AppError) {
        return NextResponse.json(
            {
                message: e.message
            },
            { status: e.statusCode }
        ); //catch specific errors from backend
    }

        

        return NextResponse.json({message:`Internal Server Error`, },{status:500})
    }

}

//endpoint to create a movie
export async function POST(req:NextRequest)
{
    try
    {
          //create the body 
          const body:MovieBody  = await req.json();

          //create the movie's array
          const {category_id, title, director ,date,plot,genre,image} = body;


          //return an error message if inputs are empty
          if (!category_id || !title || !director || !date || !plot || !genre || !image) {
    return NextResponse.json(
        { message: "Please provide all movie fields" },
        { status: 400 }
    );
}


    //create a new object
    const movie_create = new MovieModel();

    //call the function to create the movie. functional handles all errors, and catch block returns them
    const create_new_movie = await movie_create.CreateMovie(category_id, title, director ,date,plot,genre,image);

    //if all goes well return a success message
    return NextResponse.json({message:'Success, movie created',MovieModel:create_new_movie},{status:201});



    }catch(e)
    {
        //return the backend errors if any
        if(e instanceof AppError)
        {
            return NextResponse.json(
            {
                message: e.message
            },
            { status: e.statusCode }
        );

        }
    }

    return NextResponse.json({message:`Internal Server Error`, },{status:500}) //return a generic error
  
}


