//importing sqlite3!Using verbose to get all the log messages!
const sqlite3 = require('sqlite3').verbose();


//creating the DB object!
//calling the database method to generate the db file and connect!!
const DB = new sqlite3.Database('./movies.db',sqlite3.OPEN_READWRITE| sqlite3.OPEN_CREATE, connected);

//creating the connected() function to do error handling etc!
function connected(err)
{
    //returning error msg if sth goes wrong!
    if(err)
    {
        console.log(err.message);//console log to see the exact error!
        return 
    }
    else
    {
        //returning success message if all goes well!
        console.log('Connected to database movies with success');
    }

};

//creating a sql query to create tables inside this DB!
//since the client app will be simple and the admin will 
// only be able to view,create,delete or update a movie
//I will need 2 tables for this. Movies, Categories. I want to keep it as much simple as 
//I can and not be forced to execute complex queries by joining tables etc!
let sql1 = 'Create table if not exists categories(id integer primary key autoincrement ,category_name text not null unique)';
//only url path for image will be stored in database!
let sql2 = 'Create table if not exists movies(id integer primary key autoincrement ,category_id integer,title text not null unique, director text not null, date text not null, plot text not null, genre text not null, image text, FOREIGN KEY(category_id) REFERENCES categories(id))';

//run command to create the categories table!!
DB.run(sql1,[],(err)=>{
    //trhowing error if sth goes wrong!
    if(err)
    {
        console.log('Error creating categories table',err.message);
        return;
    };
//if all goes well!
console.log('Table categories created!');
});


//creating the second table which is movies!
DB.run(sql2, [], (err)=>{
 //trhowing error if sth goes wrong!
    if(err)
    {
        console.log('Error creating movies table',err.message);
        return;
    };
    //if all goes well!
console.log('Table movies created!');
});


//exporting DB
module.exports = {DB};
