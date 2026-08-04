

//declare the function which creates the tables
import Database from 'better-sqlite3';

//function to create the tables
export default function CreateTables(database:Database.Database): void
{
  database.exec('PRAGMA foreign_keys = ON;');

    //create categories table
const   CategoriesTable = (database:Database.Database) =>{


   database.exec( `
     

        CREATE TABLE IF NOT EXISTS categories (
        
        id integer primary key autoincrement,
        category_name text not null unique
        )


    `);

  

};



//create movies table
const MoviesTable = (database:Database.Database) =>{


      database.exec( `
       

        CREATE TABLE IF NOT EXISTS movies (
        
       id integer primary key autoincrement,
       category_id integer,
       title text not null unique,
        director text not null,
         date text not null, 
         plot text not null,
          genre text not null,
           image text,
            FOREIGN KEY(category_id) REFERENCES categories(id)
      )


    `);

  

};

  CategoriesTable(database);

  MoviesTable(database);
}


