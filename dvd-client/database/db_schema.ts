//this file contains databse schema


//declare the function which creates the tables


//function to create the tables
export default function CreateTables()
{

    //create categories table
const  CategoriesTable = () =>{

    `
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS categories (
        
        id integer primary key autoincrement,
        category_name text not null unique
        );


    `;

};



//create movies table
const MoviesTable = () =>{


       `
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS movies (
        
       id integer primary key autoincrement,
       category_id integer,
       title text not null unique,
        director text not null,
         date text not null, 
         plot text not null,
          genre text not null,
           image text,
            FOREIGN KEY(category_id) REFERENCES categories(id))
        );


    `;

};


}

