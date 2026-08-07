//this document contains the categories class and its methods
//import database
import db from '@/lib/db';

//import the error class
import AppError from '@/errors/AppError';

//creating a type so TS will know what kind of attributes the array from DB returns
type Category = {
    category_id: number;
    category_name: string;
};

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
        

        //create an object to store categories
        const categories =  database ? database.prepare('Select * From categories').all() : [];

        //return an error message if there aren't any categories available
        if(categories.length === 0)
        {
            throw new AppError("Currently there aren't any categories available",404);
        }

        //return categories if found any
        return categories;
       
        
        
    }





    //get a specific category by id method
    public GetCategoryById(id:number)
    {
         //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();

        const category = database?.prepare('Select * From categories where id = ?').get(id) as Category | undefined; //get the id from the parameters

        //return an error message if category does not exists
        if(!category)
         {
            throw new AppError("Category does not exist",404);
         }

         return category;//return the category if all goes well



    }

 
    //create the method which retrieves a category by its name
    public GetCategoryByName(category_name:string)
    {
          //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();
        

          const category =  database?.prepare('Select * From categories where category_name = ?').get(category_name) as Category | undefined; 

          

         //return the category if all goes well
         return category;
          

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
            throw new AppError("Category already exists", 409);
        }
        else
        {
              return  database?.prepare('Insert into categories (category_name) values(?)').run(category_name);

        }

      

    }




    //create delete category method

    public DeleteCategory(category_name:string)
    {

        //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();

        //verify whether category exists or not
        //call GetCategoryByName method
        const category_name_exists = this.GetCategoryByName(category_name);

        //return an error message if this category exists
        if(!category_name_exists)
        {
            throw new AppError("Category does not exist",404);
        }
       
       
        //query to delete the category
        const deleted_category =  database.prepare('Delete FROM categories where category_name = ?').run(category_name);

        //return an error message if sth goes wrong
        if(deleted_category.changes === 0)
        {
            throw new AppError("Error, cannot delete the category",500);
        }

        //return the category if all goes well
        return deleted_category;

    }


    //method to update category's name
    public UpdateCategory(category_id:number,category_name:string)
    {
         //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();

        
        
        //verify if a category with the give id exist
        const id_exists = this.GetCategoryById(category_id)

        //return an error if id does not exists
        if(!id_exists)
        {
            throw new AppError(`The category with id: ${category_id} does not exist`,404);
        }
        
        //verify whether category's name exist or not
         //call GetCategoryByName method
        const category_name_exists = database?.prepare(`Select *FROM categories where category_name = ?`).get(category_name)as Category | undefined;;
               

        //return an error message if this category exists. 
        // I validate if there's anothert category with different id and the same category name to validate if there's another category with the name I want to provide
        if(category_name_exists && category_name_exists.category_id !== category_id)
        {
            
            throw new AppError("Category already exists",409);
        }
        else
        {
            
              return  database?.prepare('Update categories set category_name = ? where id = ?').run(category_name,category_id);

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
                      throw new AppError("Database connection failed", 500); //throw an exception if connection has not been established
                  
                }
                return db!;//return the database if connction has been established
        
            }
}

//export categories class
export default Categories;