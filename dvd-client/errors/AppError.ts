//this is the file that contains the error class
//I impleneted this class in order to use it to throw errors. Those errors will get caught by mehtods in classes and thrown in the API catch block

//create the error class
export default class AppError extends Error
{
      public statusCode: number;


    constructor(message: string, statusCode: number) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
    }


}