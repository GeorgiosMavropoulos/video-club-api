//import database
import db from '@/lib/db';

//import next response + request
import { NextRequest, NextResponse } from 'next/server';


//create get all movies endpoint
export async function GET(req:NextRequest)
{
    //try-catch to handle errors
    try
    {

        //return an error message if db is not initialized
        if(!db)
        {
            return NextResponse.json({message:'Database connection failed'},{status:500});
        }

        //create the statement
        const movies = db.prepare('Select * From movies').all(); //retrieve all movies

        //return an error message if no movie exists
        if(movies.length === 0)
        {
            //return an error code
            return NextResponse.json({message:`Currently there aren't any movies available`},{status:404});
        }

        //if all goes well and atleast one movie exists, return it
        return NextResponse.json({message:`Success`,movies},{status:200});

    }catch(e: unknown)
    {
        

        return NextResponse.json({message:`Internal Server Error`},{status:500})
    }

}