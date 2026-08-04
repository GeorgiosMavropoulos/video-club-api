//establishing a connection with the db!
const {DB} = require('./connect.js');

//importing express
const express = require('express');
const cors = require('cors');
//creating the express server!
const app = express();

app.use(cors());

app.use(express.json());//using this middleware for parsing json data!

//using this in order to handle url encoded data!
app.use(express.urlencoded({extended:true}));

//added this middleware in order to relax the csp policy about images, bootstrap styles,css etc..
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; " + 
        "img-src 'self' http://localhost:4000 https://cdn.jsdelivr.net data:; " + 
        "style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; " + 
        "script-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; " + 
        "font-src 'self' https://cdn.jsdelivr.net; " +  //allowing fonts from CDN
        "connect-src 'self' https://cdn.jsdelivr.net; " + //allowing connections to CDN
        "object-src 'none'; " + //blocking plugins (like Flash, etc.)
        "frame-src 'none';"    //blocking embedding the page in frames
    );
    next();
});
//importing path module!
const path = require('path');
//using this path to upload images!
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

//using this to server static html files!
app.use(express.static(path.join(__dirname, '../CLIENT'))); 

//creating the port!
const port = process.env.PORT || 4000;



//creating a new route to serve the html page!
app.get('/', (req, res)=>{
 
  res.sendFile(path.join(__dirname, '../CLIENT/HomePage.html'))

});

/**
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
 *  GET http://localhost:4000/movies
 *
 * @apiNotes
 * - This endpoint uses `DB.all()` to fetch all rows from the database.
 * - Even if 1 movie exists, it returns 200.
 * - If the database table is empty, a 404 status is returned.
 */
//creating the get all endpoint!
app.get('/movies',(req,res)=>{
  res.set('content-type','application/json');//setting the http setter!

  //creating the sql query!
  const sql = 'Select * From movies';

  //creating a new array to store all movies!
  let data = {movies:[]};

  //try-catch error to handle the errors!
  try
  {
    //executing the query!
    DB.all(sql, [], (err,rows)=>{
      
         //throwing error if sth goes wrong!
         if(err){
              return res.status(500).json({message: 'Error while trying to retrieve all movies'});
         }

         if(rows && rows.length > 0)//if there are existed movies!
         {
               //foreach loop to retrieve the data and push it in the array!
         rows.forEach((row)=>{
            //pushing data to the array!
            data.movies.push({id:row.id,category_id:row.category_id,title:row.title,director:row.director,
                            date:row.date, plot:row.plot, genre:row.genre, image:row.image });
           

         });
        
         //sending the movies back!
         res.status(200).json(data);


         }else{//if no movies found, return error message!
             return res.status(404).json({message: 'Cannot find any movies'});
         }

      
    });

  }catch(err)
  {
    console.log(err.message);//loging the error msg!
    //sending back status 400!
    return res.status(400).json({message: 'Error will trying to display all movies'});
  }
});
 
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
//creating a get all categories endpoint!
app.get('/movies/categories',(req,res)=>{
res.set('content-type','application/json');//setting the http setter!
 
  //creating the sql query!
  const sql = 'Select * From categories';

  //executing the query!
  DB.all(sql,[],(err,rows)=>{
   
    //throwing an error if sth goes wrong!
    if(err)
    {
            console.error(err);//logging err
      return res.status(500).json({message: `Error:${err.message}`});
    }

    //if all goes well
    if(!rows ||rows.length === 0)
    {
       return res.status(404).json({message:'No categories found'});
    }

    //if all goes well
      let data = {categories:[]};
      //populating the data array!
      rows.forEach((row)=>{
        data.categories.push({category_id:row.id,category_name:row.category_name});
      });
       
      //returning the categories!
      res.status(200).json(data);      

  });

});

/**
 * @api {get} /movies/categories/:category_name  Get Movies by Category
 * @apiName GetMoviesByCategory
 * @apiGroup Categories
 *
 * @apiDescription
 * Retrieves **all movies** belonging to a specific category.
 * 
 * The endpoint:
 *   - Accepts a category name (case-insensitive)
 *   - Returns a list of movies belonging to this category (if any)
 *   - Returns **404** when the category does not exist OR the category exists but has no movies
 *   - Returns **400** if no category name is provided
 *   - Returns **500** if a database error occurs
 *
 * @apiParam (URL Parameter) {String} category_name  
 * The name of the category to search for (case-insensitive).
 *
 * @apiSuccess (200 OK) {Object[]} movies                Array of movies belonging to the category.
 * @apiSuccess (200 OK) {Number}   movies.id             Movie ID.
 * @apiSuccess (200 OK) {Number}   movies.category_id    Category ID associated with the movie.
 * @apiSuccess (200 OK) {String}   movies.title          Movie title.
 * @apiSuccess (200 OK) {String}   movies.director       Director's name.
 * @apiSuccess (200 OK) {String}   movies.date           Release date.
 * @apiSuccess (200 OK) {String}   movies.plot           Movie plot/summary.
 * @apiSuccess (200 OK) {String}   movies.genre          Movie genre.
 * @apiSuccess (200 OK) {String}   movies.image          Image URL or path.
 *
 * @apiSuccessExample {json} Success Response (200):
 * {
 *   "movies": [
 *     {
 *       "id": 2,
 *       "category_id": 2,
 *       "title": "Superbad",
 *       "director": "Greg Mottola",
 *       "date": "2008",
 *       "plot": "Two high school buddies try to make the most of their last days before graduation",
 *       "genre": "Comedy",
 *       "image": "/uploads/superbad.jpeg"
 *     }
 *   ]
 * }
 *
 * @apiError (400 Bad Request) {String} message  
 * Missing  category name.
 *
 * @apiErrorExample {json} Missing Category Name (400):
 * {
 *   "message": "Please provide category name"
 * }
 *
 * @apiError (404 Not Found) {String} message  
 * No movies found OR category does not exist.
 *
 * @apiErrorExample {json} Not Found (404):
 * {
 *   "message": "There aren't any movies registered on this category or the category you are looking for does not exist."
 * }
 *
 * @apiError (500 Internal Server Error) {String} message  
 * Database or query execution error.
 *
 * @apiErrorExample {json} Database Error (500):
 * {
 *   "message": "Error while retreiving data"
 * }
 *
 * @apiExample  Example Request:
 *    http://localhost:4000/movies/categories/Comedy
 *
 * @apiNotes
 * - Category matching is **case-insensitive** due to `LOWER()` usage in SQL.
 * - A SQL JOIN is used in order to join movies from movie table with each category from category table belonging to a movie.
 * - If the category exists but has no associated movies, the endpoint returns 404.
 * - Logs errors internally for debugging (`console.error`).
 */
//creating an endpoint to get all movies belonging to a category!
app.get('/movies/categories/:category_name', (req,res)=>{
   res.set('content-type','application/json');//setting the http setter!
   
   //declaring a variable to get category's name!
   const {category_name} = req.params;

   //sending error msg if category is null!
   if(!category_name || category_name.trim() === "")
   {
   return res.status(400).json({message: 'Please provide category name'}); 
   }

   //creating the sql query!
   const sql = `Select m.id, m.category_id, m.title, m.director, m.date, m.plot, m.genre,
    m.image  From movies m join categories c on m.category_id = c.id where LOWER(c.category_name) = LOWER(?)`;

   //creating the method to execute the query!
   DB.all(sql, [category_name],(err,rows)=>{
    //returning an error msg if sth goes wrong!
    if(err)
    {
         console.error(err);
      return res.status(500).json({ message: 'Error while retreiving data' });
    }
   
         //validating that movies with this category exist!
         if(!rows || rows.length === 0)
         {
       return res.status(404).json({message: `There aren't any movies registered on this category or the category you are looking for does not exist.`});
         }

         //if all goes well!
         let data = {movies:[]};//creating the array to pass all movies!
         rows.forEach((row)=>{
          data.movies.push({id:row.id,category_id:row.category_id,title:row.title,director:row.director,date:row.date,plot:row.plot,
            genre:row.genre,image:row.image});//populating the array with the retrieved data!

         });
      
         //returning the movies!
         res.status(200).json(data);

    

   });

});


/**
 * @api {get} /movies/:id Get Movie by ID
 * @apiName GetMovieById
 * @apiGroup Movies
 * 
 * @apiDescription Retrieves a single movie from the database based on its  ID.
 * 
 * @apiParam {Number} id Movie's  ID (must be a valid integer).
 * 
 * @apiSuccess (200 OK) {Object[]} movie Array containing the movie object.
 * @apiSuccess (200 OK) {Number} movie.id Unique identifier of the movie.
 * @apiSuccess (200 OK) {Number} movie.category_id Category identifier for the movie.
 * @apiSuccess (200 OK) {String} movie.title Title of the movie.
 * @apiSuccess (200 OK) {String} movie.director Director of the movie.
 * @apiSuccess (200 OK) {String} movie.date Release date of the movie.
 * @apiSuccess (200 OK) {String} movie.plot Plot summary of the movie.
 * @apiSuccess (200 OK) {String} movie.genre Genre classification of the movie.
 * @apiSuccess (200 OK) {String} movie.image URL or path to the movie's image.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "movie": [
 *         {
 *           "id": 2,
 *           "category_id": 1,
 *           "title": "Superbad",
 *           "director": "Greg Mottola",
 *           "date": "2008",
 *           "plot": "Two high school buddies try to make the most of their last days before graduation",
 *           "genre": "Comedy",
 *           "image": "/uploads/superbad.jpeg"
 *         }
 *       ]
 *     }
 * 
 * @apiError (400 Bad Request) InvalidId No id provided or is  invalid.
 * @apiError (400 Bad Request) UnexpectedError An unexpected error occurred during execution.
 * @apiError (404 Not Found) MovieNotFound No movie exists with the specified ID.
 * @apiError (500 Internal Server Error) DatabaseError An error occurred while trying to retrieve data from the database.
 * 
 * @apiErrorExample {json} Error-Response (Invalid ID):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Id cannot be null"
 *     }
 * 
 * @apiErrorExample {json} Error-Response (Unexpected Error):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "An error occured: [error details]"
 *     }
 * 
 * @apiErrorExample {json} Error-Response (Movie Not Found):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Cannot find the movie you are looking for"
 *     }
 * 
 * @apiErrorExample {json} Error-Response (Database Error):
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error with database"
 *     }
 * 
 * @apiNote
 * - Returns the movie wrapped in an array for consistency with other endpoints.
 * - Uses DB.get() which returns a single row, but wraps it in an array.
 */
//creating the get:id endpoint. This end point search a movie based on it's id!
//creating the get all endpoint!
app.get('/movies/:id',(req,res)=>{
  res.set('content-type','application/json');//setting the http setter!
  const id = parseInt(req.params.id,10);//parsing the id!
 
//returning error msg if user does not provide an id!
if(!id)
{
    return res.status(400).json({message: 'Id cannot be null'});
};
  //creating the sql query!
  const sql = 'Select * From movies where id = ?';

  //try-catch error to handle the errors!
  try
  {
    //executing the query!
    DB.get(sql, [id], (err,row)=>{
      
         //throwing error if sth goes wrong!
         if(err){
              console.log('Error:',err.message);
              return res.status(500).json({message: 'Error with database'});
         }

         //if movie does not exists!
         if(!row)
         { 
            return res.status(404).json({message:"Cannot find the movie you are looking for"});
         }
           else
           {
               //if all goes well!
            data = {movie:[]};//creating a new array to store the data!

          //pushing data to the array!
            data.movie.push({id:row.id,category_id:row.category_id,title:row.title,director:row.director,
                            date:row.date, plot:row.plot, genre:row.genre, image:row.image });
                       
             
        
       //returning back the movie
           res.status(200).json(data);
           }
        
         

    });

  }catch(err)
  {
    console.log(err.message);//loging the error msg!
    //sending back status 400!
    return res.status(400).json({message:  `An error occured:${err.message}`});
  }
});

/**
 * @api {get} /movies/title/:title  Search Movie by Title
 * @apiName SearchMovieByTitle
 * @apiGroup Movies
 *
 * @apiDescription
 * Searches for a movie by its title using a **case-insensitive flexible match**.
 * 
 * The search:
 *   - Uses SQL `LIKE` to allow partial matches (e.g., searching "die" matches "Die hard")
 *   - Returns **only the first match** because it uses `DB.get()` instead of `DB.all()`
 *   - Is case-insensitive (`LOWER(title) LIKE LOWER(?)`)
 *
 * The endpoint validates the title and may return:
 *   - **400** if title is empty
 *   - **404** if no movie matches the search
 *   - **500** if a database error occurs
 *
 * @apiParam (URL Parameter) {String} title  
 * The movie title or part of a title to search for.
 *
 * @apiSuccess (200 OK) {Object[]} movie            Array containing the matched movie.
 * @apiSuccess (200 OK) {Number}   movie.id         Movie ID.
 * @apiSuccess (200 OK) {Number}   movie.category_id Category ID of the movie.
 * @apiSuccess (200 OK) {String}   movie.title      Full movie title.
 * @apiSuccess (200 OK) {String}   movie.director   Name of the director.
 * @apiSuccess (200 OK) {String}   movie.date       Release date.
 * @apiSuccess (200 OK) {String}   movie.plot       Movie plot description.
 * @apiSuccess (200 OK) {String}   movie.genre      Movie genre.
 * @apiSuccess (200 OK) {String}   movie.image      Poster/image URL.
 *
 * @apiSuccessExample {json} Success Response (200):
 * {
 *   "movie": [
 *     {
 *       "id": 2,
 *       "category_id": 2,
 *       "title": "Superbad",
 *       "director": "Greg Mottola",
 *       "date": "2008",
 *       "plot": "Two high school buddies try to make the most of their last days before graduation.",
 *       "genre": "comedy",
 *       "image": "/uploads/superbad.jpeg"
 *     }
 *   ]
 * }
 *
 * @apiError (400 Bad Request) {String} message  
 * Title is missing or empty.
 *
 * @apiErrorExample {json} Missing Title (400):
 * {
 *   "message": "Please provide a title"
 * }
 *
 * @apiError (404 Not Found) {String} message  
 * No movie matches the search query.
 *
 * @apiErrorExample {json} Not Found (404):
 * {
 *   "message": "Movie does not exist!"
 * }
 *
 * @apiError (500 Internal Server Error) {String} message  
 * Database or SQL execution error.
 *
 * @apiErrorExample {json} Database Error (500):
 * {
 *   "message": "Error: SQLITE_FAILED"
 * }
 *
 * @apiExample Example Request:
 *    http://localhost:4000/movies/title/superbad
 *
 * @apiNotes
 * - Only returns **one** movie because it uses `DB.get()` (use DB.all() to return multiple).
 * - Search is **not exact**: partial matches are allowed.
 * - Search is **case-insensitive**.
 * - If multiple movies match, this endpoint still returns only the first one.
 */

  //creating the search endpoint!
 app.get('/movies/title/:title',(req,res)=>{
  res.set('content-type','application/json');//setting the http setter!
 const title = req.params.title;//parsing id!

 //validating that title won't be empty!
  if(!title || title.trim() === "")
  {
  return res.status(400).json({message:'Please provide a title'})
}
  //creating the sql query!
  const sql = 'Select * From movies where LOWER(title) LIKE LOWER(?)';
  const flexSearch = `%${title}%`;//flexible searching, user does not need to type the whole title


  //executing the query!
  DB.get(sql,[flexSearch],(err,row)=>{
  //throwing an error if sth goes wrong!
  if(err)
  {
   return res.status(500).json({message: `Error:${err.message}`});
 }

        //if all goes well!
   if(row)
   {
    //creating an array to store all the data!
    let data = {movie:[]};

    //pushing the data!
    data.movie.push({id:row.id,category_id:row.category_id,title:row.title,director:row.director,
                   date:row.date, plot:row.plot, genre:row.genre, image:row.image });

        //sending a success response!
        res.status(200).json(data);
    }
        else{//returning error message if movie not found!
      return res.status(404).json({message:'Movie does not exist!'});
        }

      });
        
       
      });




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
 *http://localhost:4000/movies/categories \
 *       
 *      '{"category_name": "tv show"}'
 *
 * @apiNotes
 * - Category names are **not validated for uniqueness**. Duplicate categories may be created unless the DB enforces constraints.
 *
 * - Successful insertion returns **201 Created**.
 */


//creating the post method in order to populate table categories.Firstly I will data to test only!
app.post('/movies/categories', (req,res)=>{

    res.set('content-type','application/json');//setting the http setter!
    const {category_name} = req.body;//declaring a new variable in order to pass it in the database!


            //returning error message whether the user didn't add data to send!
            if(!category_name || category_name.trim() === '')
            {
               return res.status(400).json({message: 'Please add a category name'}); 
            };


                //validating that category name is unique!
//sql statement to validate that category does not exists!
const checkCategory = 'Select * From categories WHERE LOWER(category_name) = LOWER(?)';

//executing the statement!
DB.get(checkCategory, [category_name],(err,row)=>{
  //throwing error msg if sth goes wrong!
  if(err)
  {
    return res.status(500).json({message: 'Error with database',error:err.message});
  }


  //if category exists!
  if(row)
  {
  return res.status(400).json({message:'Category name already exists'});
  };



        //creating the sql command to insert!
    const sql = 'Insert into categories(category_name) values(?)';


    //creating the method to send the data inside the db.
    DB.run(sql,[category_name],function(err){
    
                 
            if(err){//returning the error if occurs!
                 console.log('Insert error',err.message);//loging the error message!
                return res.status(500).json({message: 'Error while trying to insert new data'});
            };

            //if all goes well returning success msg!
            res.status(201).json({message:'Created!'});

     
    });
    });
});


/**
 * @api {post} /movies/create  Create a New Movie
 * @apiName CreateMovie
 * @apiGroup Movies
 *
 * @apiDescription
 * Inserts a **new movie record** into the `movies` table.
 *  
 * This endpoint requires **all fields** to be provided and fully validated.
 * If any required field is missing or empty, the request  returns error.
 *
 * @apiBody {Number} category_id  
 * The ID of the category to which the movie belongs.
 *
 * @apiBody {String} title  
 * Movie title.
 *
 * @apiBody {String} director  
 * The movie director’s name.
 *
 * @apiBody {String} date  
 * Release date of the movie.
 *
 * @apiBody {String} plot  
 * A short movie description.
 *
 * @apiBody {String} genre  
 * Movie genre.
 *
 * @apiBody {String} image  
 * URL or path to the movie's  image.
 *
 *
 * @apiSuccess (201 Created) {String} message  
 * Confirms whether the movie was successfully inserted into the database.
 *
 * @apiSuccessExample {json} Success Response:
 * {
 *   "message": "Movie added"
 * }
 *
 *
 * @apiError (400 Bad Request) {String} message  
 * It is returned when one or more fields are missing or empty.
 *
 * @apiErrorExample {json} Missing Fields (400):
 * {
 *   "message": "Please complete all fields"
 * }
 *  @apiError (400 Bad Request) {String} message  
 *  It is returned when movie already exists.
 * 
 * @apiErrorExample {json} Movie already exists(400):
 * {
 *   "message": "Movie with the same title already exists"
 * }
 * 
 * @apiError (404 Bad Request) {String} message
 * It is returned when category id or genre does not exists!
 * 
 *  @apiErrorExample {json} Category does not exists(404):
 * {
 *   "message": "The category does not exists"
 * }
 *
 * @apiError (500 Internal Server Error) {String} message  
 * It is returned when a database error occurs during insertion.
 *
 * @apiErrorExample {json} Database Error (500):
 * {
 *   "message": "Error: UNIQUE constraint failed: movies.title"
 * }
 *
 *
 * @apiExample  Example Request:
 *  http://localhost:4000/movies/create \
 *       \
 *       '{
 *            "category_id": 2,
 *            "title": "Superbad",
 *            "director": "Greg Mottola",
 *            "date": "2008",
 *            "plot": "Two high school buddies try to make the most of their last days before graduation.",
 *            "genre": "Comedy",
 *            "image": "/uploads/superbad.jpeg"
 *          }'
 *
 * @apiNotes
 * - This endpoint **requires all fields** — none are optional.
  */

//creating the post method to add data to movies table! Firstly I will add test data!
app.post('/movies/create', (req,res)=>{

    res.set('content-type','application/json');//setting the http setter!
    const {category_id,title,director,date,plot,genre,image} = req.body;//declaring a new variable in order to pass it in the database!
  
     //returning error msg if a field is null!
    if(!category_id ||!title?.trim() || !director?.trim() || !date?.trim() || !plot?.trim() || !genre?.trim() || !image?.trim())
    {
     return res.status(400).json({message: 'Please complete all fields'}); 

    }

    //validating that movie does not pre-exists!
    const checkIfMovieExists = 'Select * From movies where LOWER(title) = LOWER(?)';

    //creating a db.get method to retrive all movies in order to validate whether the movie with the same title exists or not!
    DB.get(checkIfMovieExists, [title],(err, row)=>{
     
      //throwing an error if database is not responding!
      if(err)
      {
        return res.status(500).json({message: 'Error with database',error:err.message});
      }

      //validating if movie with the same title already exists!
      if(row)
      {
        return res.status(400).json({message:'Movie with the same title already exists'});
      }
      //if movie is unique!
      //validating that the category actually exists!
      const sql_validate_category_exists = 'SELECT * FROM categories where id = ? and LOWER(category_name) = LOWER(?)';

      //executing the query to validate whether category exists or not!
      DB.get(sql_validate_category_exists,[category_id,genre],(err,row)=>{
         //throwing an error if database is not responding!
      if(err)
      {
        return res.status(500).json({message: 'Error with database',error:err.message});
      }
       
       //returning an an error message if category does not exists!
       if(!row)
       {
        return res.status(404).json({message:`The category does not exists`});
       }
       //if the category exists!
       //creating the sql command to insert!
    const sql = 'Insert into movies(category_id,title,director,date,plot,genre,image) values(?,?,?,?,?,?,?)';
  

    //creating the method to send the data inside the db.
    DB.run(sql,[category_id,title,director,date,plot,genre,image],function(err){
    
      
            if(err){//returning the error if occurs!
                 console.log('Insert error',err.message);//loging the error message!
              
                return res.status(500).json({message:`Error: ${err.message}`});
            };

            //if all goes well returning success msg!
            res.status(201).json({message:'Movie added'});

     
    });

      })


    });

    
});

/**
 * @api {put} /movies/:id Update Movie Information
 * @apiName UpdateMovie
 * @apiGroup Movies
 *  *
 * @apiParam {Number} id The id of the movie to be updated.
 *
 * @apiParam {Number} category_id The category ID of the movie.
 * @apiParam {String} title The title of the movie.
 * @apiParam {String} director The director of the movie.
 * @apiParam {String} date The release date of the movie.
 * @apiParam {String} plot A short description of the plot.
 * @apiParam {String} genre The genre of the movie.
 * @apiParam {String} image The image URL for the movie.
 *
 * @apiSuccess {String} message Success message indicating the movie was updated.
 *
 * @apiError (400 Bad Request) MissingField Some required fields were missing or invalid.
 * @apiError (404 Not Found) MovieNotFound Movie with the specified ID does not exist.
 * @apiError (404 Category not found) Category Category does not exist
 * @apiError (500 Internal Server Error) DatabaseError Error updating the movie in the database.
 *
 * @apiExample Example usage:
 *      "http://localhost:4000/movies/2" \
 *      
 *      '{
 *       "id":2,
 *       "category_id": 1,
 *       "title": "Superbad",
 *       "director": "Greg Mottola",
 *       "date": "2008",
 *       "plot": "Two high school buddies try to make the most of their last days before graduation",
 *       "genre": "Comedy",
 *       "image": "/uploads/superbad.jpeg"
 *     }'
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Movie with id: 2 has been  updated"
 *     }
 *
 * @apiErrorExample {json} Error-Response (Missing Field):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Please complete all fields"
 *     }
 *
 * @apiErrorExample {json} Error-Response (Movie Not Found):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Movie with id: 999 does not exist!"
 *     }
 * @apiErrorExample {json} Error-Response (Cagery does not exists):
 *    HTTP/1.1 404 Not Found
 *    {
 *     "message":"Category does not exists!"
 *    }
 *
 * @apiErrorExample {json} Error-Response (Database Error):
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error trying to update the movie"
 *     }
*/
//creating the put endpoint!
app.put('/movies/:id',(req,res)=>{

       res.set('content-type','application/json');//setting the http setter!
       const id = parseInt(req.params.id, 10);//parsing id!
    const {category_id,title,director,date,plot,genre,image} = req.body;//declaring new vars to pass the updated on database!
     //returning error msg if a field is null!
    if(!id || !category_id ||!title?.trim() || !director?.trim() || !date?.trim() || !plot?.trim() || !genre?.trim() || !image?.trim())
    {
     return res.status(400).json({message: 'Please complete all fields'}); 

    }

    //creating the sql query!
    const sql = 'Update movies set category_id =?, title = ?, director = ?, date = ?, plot = ?, genre = ?, image = ? where id = ?';

     //try-catch block to handle errors!
     try
     {

      //validating that category and genre exist!
      let sql_validate_category_id_and_category_name = `SELECT * FROM categories where id = ? 
      and LOWER(category_name) = LOWER(?)`;

      //executing the query
      DB.get(sql_validate_category_id_and_category_name,[category_id,genre],(err,row)=>{
        //returning an error message if server does not send a response!
        if(err)
        {
          return res.status(500).json({message:`Internal server error:${err.message}`});
        }

        //returning an error message if category_id or name does not exist!
        if(!row)
        {
          return res.status(404).json({message:`Category does not exists`});
        }

        //if category name and id are valid!
        //execturing the query!
          DB.run(sql, [category_id,title,director,date,plot,genre,image,id], function(err){
            //throwing error !
        if(err)
        {
             console.log('Insert error',err.message);//loging the error message!
             return res.status(500).json({message: 'Error trying to update the movie'});
        }
           //returning err if movie does not exist!
            if(this.changes === 0){
              return res.status(404).json({message: `Movie with id:${id} does not exist!`});
            }
             //if all goes well!
         return res.status(200).json({message: `Movie with id:${id}  updated`});

          });     

      })
        
     }catch(err)
     {
        return res.status(400).json({message: err.message});//returning err msg if sth goes wrong!
     }

});

/**
 * @api {delete} /movies/:id  Delete a Movie by ID
 * @apiName DeleteMovie
 * @apiGroup Movies
 *
 * @apiDescription
 * Deletes a specific movie from the `movies` table using its id.
 *
 * The endpoint validates:
 * - If the id is provided and valid
 * - If the movie exists before gets deleted
 *
 *
 * @apiParam (URL Path) {Number} id  
 * The id of the movie you want to delete.
 *
 *
 * @apiSuccess (200 OK) {String} message  
 * Success message indicating the movie was deleted.
 *
 * @apiSuccessExample {json} Success Response (200):
 * {
 *   "message": "Movie with id:15 has been deleted!"
 * }
 *
 *
 * @apiError (400 Bad Request) {String} message  
 * It is returned when the ID is missing or invalid.
 *
 * @apiErrorExample {json} Invalid ID (400):
 * {
 *   "message": "Please provide an id"
 * }
 *
 *
 * @apiError (404 Not Found) {String} message  
 * It is returned when no movie exists with the specified ID.
 *
 * @apiErrorExample {json} Movie Not Found (404):
 * {
 *   "message": "Movie with id:15 does not exists"
 * }
 *
 *
 * @apiError (500 Internal Server Error) {String} message  
 * It is returned when a database error occurs while trying to delete.
 *
 * @apiErrorExample {json} Database Error (500):
 * {
 *   "message": "Error trying to delete the movie"
 * }
 *
 *
 * @apiExample  Example Request:
 *  http://localhost:4000/movies/15
 *
 *
 * @apiNotes
 * - Uses `this.changes` provided  to verify
 *   whether a row was deleted or not.
 * - It returns a very clean,  message for each failure.
  */
//creating the delete endpoint!
app.delete('/movies/:id',(req,res)=>{
      res.set('content-type','application/json');//setting the http setter!
       const id = parseInt(req.params.id, 10);//parsing id!

           
       //validating that id won't be null!
       if(!id)
        {
            return res.status(400).json({message:'Please provide an id'});
       };
       //creating the sql query!
       const sql = 'Delete From movies where id = ?';

       //executing the query!
       DB.run(sql, [id], function(err){
        
        //try-catch block to do error handling!
        try{

          if(err){
            console.log('Delete error',err.message);//loging the error message!
             return res.status(500).json({message: 'Error trying to delete the movie'});
          }

          //returning error message if no movie found!
          if(this.changes ===0)
          {
            return res.status(404).json({message: `Movie with id:${id} does not exists`});
          }

       return res.status(200).json({message: `Movie with id:${id} has been deleted!`}); 
         


        }catch(err){
        return res.status(400).json({message: `Error deleting the movie with id:${id}.${err.message}`});
        }

       });
      });



/**
 * @api {delete} /movies/categories/del/:category_name  Delete a Category by its name
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
 *  http://localhost:4000/movies/categories/del/tv show
 *
 *
 * @apiNotes
 * - Uses `this.changes` provided  to verify
 *   whether a row was deleted or not.
 * - It returns a very clean,  message for each failure.
  */
//creating an endpoint to enable user delete a specific category!
app.delete('/movies/categories/del/:category_name',(req,res)=>{
res.set('content-type','application/json');//setting the http setter!
  //creating an object to store delete's category name from the url!
  const del_category_name = req.params.category_name;

  //validating that category name won't be null!
  if(!del_category_name)
  {
    return res.status(400).json('Please specify the category name you wish to delete');
  };

  //creating the sql query to delete the category!
  const sql = 'Delete From categories where LOWER(category_name) = LOWER(?)';

  //executing the query!
  DB.run(sql, [del_category_name], function(err){

    //try-catch block to handle unexpected errors!
     try{

      //returning error msg if server does not respond!
      if(err)
      {
        return res.status(500).json({message:'Internal server error'});
      }

      //returning error message if the required category does not even exist!
      if(this.changes === 0)
      {
        return res.status(404).json({message:`The category:${del_category_name} does not exists`});
      }

      //if all goes well returning a success message!
      return res.status(200).json({message:`Success the category:${del_category_name} has been deleted`});

     }catch(err)
     {
      return res.status(400).json({message:`Error deleting the category :${del_category_name}`});
     }
  })

});




//creating the function to use port 4000!
app.listen(port, function (err){

    //returning error msg if sth goes wrong!
    if(err){
        console.log('Error, cannot connect to port 4000');
        return;
    };
    //if all goes well!
    console.log(`Success:Your connection is active on ${port}`);

});

