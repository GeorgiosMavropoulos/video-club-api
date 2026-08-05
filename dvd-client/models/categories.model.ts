//this document contains the categories class and its methods
//import database
import db from '@/lib/db';

//categories class

class Categories
{
 category_id: number;
 category_name: string;


 //declare a constructor
 constructor(category_id:number= 0, category_name:string = "")
 {
    this.category_id = category_id;
    this.category_name = category_name;
 }


     //create setter and getter methods
   public setCategoryName(category_name_to_set:string): void
    {
       this.category_name= category_name_to_set ;
    }

    public getCategoryName() :string
    {
        return this.category_name;
    }
    public getId(): number {
        return this.category_id;
    }

    public setId(category_id: number): void {
        this.category_id= category_id;
    }




    //get all categories method from db
        //get all movies method
   public  GetAllCategories()
    {
        //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();
        
        return  database ? database.prepare('Select * From categories').all() : [];
       
        
        
    }



    //get a specific category by id method
    public GetCategoryById(id:number)
    {
         //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();

         return  database?.prepare('Select * From categories where id = ?').get(id); //get the id from the parameters

    }

  /*  **
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

    //create the method which retrieves a category by its name
    public GetCategoryByName(category_name:string)
    {
          //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();

         return  database?.prepare('Select * From categories where category_name = ?').get(category_name); //get the category from the parameters

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
 *http://localhost:4000/movies/categories \
 *       
 *      '{"category_name": "tv show"}'
 *
 * @apiNotes
 * - Category names are **not validated for uniqueness**. Duplicate categories may be created unless the DB enforces constraints.
 *
 * - Successful insertion returns **201 Created**.
 */


    //insert into DB method
    public CreateCategory(category_name:string)
    {
         //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();

        //verify whether category exists or not
        //call GetCategoryByName method
        const category_name_exists = this.GetCategoryByName(category_name);

        //return an error message if this category exists
        if(category_name_exists)
        {
            throw new Error("Category already exists");
        }
        else
        {
              return  database?.prepare('Insert into categories(category_name)values(?)').run();

        }

      

    }




        //helper method to return an error message if system cannot establish db conneciton
        private  isConnected(): Boolean
        {
              if (!db) {
            
            return false; 
        }
        else 
        {
            return true;
        }
    
        }


           //create a helper method to establish connection with DB
            private GetDataBase(){
        
                if(!this.isConnected())
                {
                      throw new Error("Database connection failed"); //throw an exception if connection has not been established
                  
                }
                return db;//return the database if connction has been established
        
            }
}