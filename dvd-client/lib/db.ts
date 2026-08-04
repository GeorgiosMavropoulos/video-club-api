//this is the db initialization utility

import Database from 'better-sqlite3';//importing the Databse from better-sqlite3 lib

import path from 'path'; //import path from path lib

import fs from 'fs';

//Prevent multiple connections during Next.js hot-reloads
const globalForDb = globalThis as unknown as {
    db:Database.Database | undefined;
};




//create the db path object to store the database
const dbPath = path.join(process.cwd() , process.env.SQLITE_DB_PATH || '');

//declare a function to intialize DB
const connectToDatabase =  () =>{

console.log("SQLITE_DB_PATH:", process.env.SQLITE_DB_PATH);
console.log("DB PATH:", dbPath);

    try{
         globalForDb.db??= new Database(dbPath,{ fileMustExist: true });
     
    

    //return a success message if connection has been established
    console.log('Success, connection was established');
    }catch(e) //log errors if db failed to get initialized
    {
        console.log(`Error connecting to database"${e}`);

    }
   //return the connection
   return globalForDb.db;

}
//export the db connection method. Added the () in order to execute the function here in this file
export default connectToDatabase();

