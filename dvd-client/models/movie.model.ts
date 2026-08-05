
import db from '@/lib/db';

//this file contains movie's model methods in order not to execute queries directly from the api

const MovieModel =  {

    //get all movies method
     GetAllMovies()
    {
        return   db?.prepare('Select * From movies').all();
    },

}


//export movie model
export default MovieModel;
