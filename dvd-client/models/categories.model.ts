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
    //insert into DB method




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