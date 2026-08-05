
import db from '@/lib/db';

//this file contains movie's model methods in order not to execute queries directly from the api

class MovieModel {

   //declare properties
    private title: string;
    private id: number;
   private  category_id: number;
    private director: string;
    private date: string;
    private plot: string;
    private image: string;


    //declare a constructor
    constructor(title:string ="",id:number = 0,director:string ="",date:string ="",plot:string ="",image:string ="", category_id:number =0)
    {
        //initialize the proprties
        this.title = title;
        this.id = id;
        this.director = director;
        this.date = date;
        this.image = image;
        this.plot =plot;
        this.category_id = category_id
    }

    

    //create setter and getter methods
   public setTitle(title_to_set:string): void
    {
       this.title = title_to_set ;
    }

    public getTitle() :string
    {
        return this.title;
    }
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCategoryId():number
    {
        return this.category_id;
    }

    public setCategoryId(category_id: number):void{
        this.category_id = category_id
        
    }

    public getDirector(): string {
        return this.director;
    }

    public setDirector(director: string): void {
        this.director = director;
    }

    public getDate(): string {
        return this.date;
    }

    public setDate(date: string): void {
        this.date = date;
    }

    public getPlot(): string {
        return this.plot;
    }

    public setPlot(plot: string): void {
        this.plot = plot;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

 


    //get all movies method
   public  GetAllMovies()
    {
        //create a DB object if connection is active, else the helper method below will return an error
        const database = this.GetDataBase();
        
        return  database ? database.prepare('Select * From movies').all() : [];
       
        
        
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


    //insert into database a movie method

}


//export movie model
export default MovieModel;
