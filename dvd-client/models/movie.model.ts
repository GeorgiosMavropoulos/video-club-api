
import db from '@/lib/db';

//import app error class
import AppError from '@/errors/AppError';

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
        

        //create an object to store the retrived movies
        const movies = database ? database.prepare('Select * From movies').all() : [];

        //return an error message if no movie exists
        if(movies.length === 0)
        {
            throw new AppError("Currently there aren't any movies available", 404);

        }

         return movies;//return movies if all goes well
       
        
        
    }


    //method to create a new movie
    public CreateMovie(category_id:number,title:string,director:string, date:string, plot:string, genre:string,image:string)
    {

            //create a DB object if connection is active, else the helper method below will return an error
           const database = this.GetDataBase();

     
        //return an error message if movie's title is duplicated
        const movie_title = database.prepare('Select *FROM movies where title = ?').get(title);

        if(movie_title)
        {
            throw new AppError("There's another movie with the same title",409);

        }

        //search if category id exists and genre matches with a category name
        const categoryId = database.prepare('Select *FROM categories where id = ? and category_name = ?').get(category_id,genre);

        //return an error message if category id does not exists
        if(!categoryId)
        {
            throw new AppError("The category does not exists",404);
        }

        
     
           //create an object to delegate the query
    const create_movie = database.prepare(`Insert into movies (category_id, title, director, date, plot, genre, image) values (?,?,?,?,?,?,?)`).run(category_id,title,director,date,plot,genre,image);


     

      //return an error message if something goes wrong
      if (create_movie.changes === 0) {
      throw new AppError("Movie could not be created", 500);
}

  //if all goes well return the object
    return create_movie;

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
              throw new AppError("Database connection failed",500); //throw an exception if connection has not been established
          
        }
        return db!;//return the database if connction has been established

    }


    //insert into database a movie method

}


//export movie model
export default MovieModel;
