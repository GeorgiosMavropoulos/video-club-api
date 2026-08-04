//this is the db initialization utility

import Database from 'better-sqlite3';//importing the Databse from better-sqlite3 lib

import path from 'path'; //import path from path lib

import fs from 'fs';

import CreateTables from '@/database/db_schema';

//Prevent multiple connections during Next.js hot-reloads
const globalForDb = globalThis as unknown as {
    db:Database.Database | undefined;
};




//create the db path object to store the database
const dbPath = path.join(process.cwd() , process.env.SQLITE_DB_PATH || '');

 
//declare a function to intialize DB
const connectToDatabase =  () =>{


 
   //if connection exists at first, return the connection
        if (globalForDb.db) {
        return globalForDb.db;
    }

    try{
         
        
        
            // 1. Ensure the directory structure exists before creating the file
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        globalForDb.db??= new Database(dbPath,{ fileMustExist: false });


        //if file does not exists execute the   schemaSql to create the table
        // Execute all SQL statements in the file at once. If tables exists, they won't re-generated
        if(globalForDb.db)
        {
              CreateTables(globalForDb.db);
        }
      
    

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

