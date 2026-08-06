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



    /**
 * Retrieves a specific category by its unique identifier.
 *
 * This method searches the categories table and returns the category
 * that matches the provided ID.
 *
 * @param {number} id - The unique identifier of the category.
 *
 * @throws {Error} Throws an error if the database connection is unavailable.
 *
 * @returns The category object if found, otherwise undefined.
 */

    //get a specific category by id method
    public GetCategoryById(id:number)
    {
         //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();

         return  database?.prepare('Select * From categories where id = ?').get(id); //get the id from the parameters

    }

 
    //create the method which retrieves a category by its name
    public GetCategoryByName(category_name:string)
    {
          //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();
        

         return  database?.prepare('Select * From categories where category_name = ?').get(category_name); //get the category from the parameters

    }




  


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
              return  database?.prepare('Insert into categories (category_name) values(?)').run(category_name);

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


    //create delete category method

    public DeleteCategory(category_name:string)
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
              return  database?.prepare('Delete *FROM categories where category_name = ?').run(category_name);

        }

    }

    /**
 * Updates the name of an existing category.
 *
 * This method checks whether the provided category name already exists.
 * If another category with the same name is found, an error is thrown.
 * Otherwise, the category name is updated in the database.
 *
 * @param {number} category_id - The unique identifier of the category to update.
 * @param {string} category_name - The new name that will be assigned to the category.
 *
 * @throws {Error} Throws an error if the database connection is unavailable
 * or if a category with the same name already exists.
 *
 * @returns The result of the update operation.
 */
    //method to update category's name
    public UpdateCategory(category_id:number,category_name:string)
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
              return  database?.prepare('Update categories set category_name = ? where category_id = ?').run(category_id);

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

//export categories class
export default Categories;