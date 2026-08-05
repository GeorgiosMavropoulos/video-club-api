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
}