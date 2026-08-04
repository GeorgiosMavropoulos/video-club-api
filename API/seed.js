//importing db!
const {DB} = require('./connect.js');


//creating an array with categories!
const categories = [

    //comedy
    "Comedy",
    //drama
    "Drama",
    //action
    "Action",
    //Horror
    "Horror",
    //crime
    "Crime",
    //documentary
    "Documentary"

];

//creating an array with movies!
const movies = [
  //comedies
  [1, "The Mask", "Chuck Russell", "1994", "A timid bank clerk discovers a magical mask that transforms him into a manic superhero.", "Comedy","/uploads/mask.jpeg"],
  [1, "Superbad", "Greg Mottola", "2007", "Two high school friends try to make the most of their last days before graduation.", "Comedy","/uploads/superbad.jpeg"],
  [1, "Groundhog Day", "Harold Ramis", "1993", "A weatherman relives the same day over and over again until he learns to change.", "Comedy","/uploads/groundhog.jpeg"],

    //dramatic movies
  [2, "The Shawshank Redemption", "Frank Darabont", "1994", "Two imprisoned men bond over years and find hope in a hopeless place.", "Drama","/uploads/shawshank.jpeg"],
  [2, "Forrest Gump", "Robert Zemeckis", "1994", "The story of a man with a low IQ who lives an extraordinary life.", "Drama","/uploads/forrest.jpeg"],
  [2, "The Godfather", "Francis Ford Coppola", "1972", "The aging patriarch of a crime dynasty transfers control to his reluctant son.", "Drama","/uploads/god.jpeg"],
  [2, "The Pursuit of Happyness", "Gabriele Muccino", "2006", "A struggling salesman takes custody of his son as he tries to build a better life.", "Drama","/uploads/pursuit.jpeg"],
  //action
  [3, "Die Hard", "John McTiernan", "1988", "A NYPD officer battles terrorists who have taken hostages in a Los Angeles skyscraper.", "Action","/uploads/die_hard.jpeg"],
  [3, "Mad Max: Fury Road", "George Miller", "2015", "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler.", "Action","/uploads/madmax.jpeg"],
  [3, "Gladiator", "Ridley Scott", "2000", "A betrayed Roman general seeks revenge against the corrupt emperor.", "Action","/uploads/gladiator.jpeg"],
   [3, "John Wick", "Chad Stahelski", "2014", "A retired hitman seeks vengeance for the killing of his dog.", "Action","/uploads/wick.jpeg"],
  //horror
  [4, "The Conjuring", "James Wan", "2013", "Paranormal investigators work to help a family terrorized by a dark presence.", "Horror","/uploads/conj.jpeg"],
  [4, "It", "Andy Muschietti", "2017", "Children in a small town face a shape-shifting clown who preys on their fears.", "Horror","/uploads/it.jpeg"],
  [4, "A Nightmare on Elm Street", "Wes Craven", "1984", "A killer haunts teenagers in their dreams, causing real-life deaths.", "Horror","/uploads/nightmare.jpeg"],

  //crime
  [5, "Se7en", "David Fincher", "1995", "Two detectives hunt a serial killer who uses the seven deadly sins as his motives.", "Crime Thriller","/uploads/7.jpeg"],
  [5, "The Departed", "Martin Scorsese", "2006", "An undercover cop and a mole in the police try to identify each other.", "Crime Thriller","/uploads/dep.jpeg"],
  [5, "Gone Girl", "David Fincher", "2014", "A man becomes the prime suspect in the disappearance of his wife.", "Crime Thriller","/uploads/gone.jpeg"],

  // documentary
  [6, "March of the Penguins", "Luc Jacquet", "2005", "A documentary following the annual journey of Emperor penguins in Antarctica.", "Documentary","/uploads/penguins.jpeg"],
  [6, "13th", "Ava DuVernay", "2016", "Examines the history of racial inequality in the United States prison system.", "Documentary","/uploads/13.jpeg"],
  [6, "Planet Earth II", "David Attenborough", "2016", "Explores the beauty and diversity of life on Earth.", "Documentary","/uploads/p2.jpeg"]

];


//creating the function to serialize the database!
function seed(){
DB.serialize(()=>{
console.log('Seeding the database....!');

//creating the sql statement to send data in the database, inside a try-catch block!


      //if all goes well!
      //creating a sql prepare stmt to create the categories!!
      const categoriesStm = DB.prepare('Insert OR IGNORE into categories (category_name) values (?)');
      //adding the data from the array to the stm!
      categories.forEach(c=>categoriesStm.run(c));//foreach loop to populate each row!
      //finalizing the statement!
      categoriesStm.finalize();

      //now I will insert the movies
      //sql statement to insert the movies!
      const moviesStm = DB.prepare('Insert OR IGNORE into movies(category_id,title, director, date, plot , genre, image) values(?,?,?,?,?,?,?)');
        //adding the data from the array to the stm!
      movies.forEach(m=>moviesStm.run(m));//foreach loop to populate each row!
      //finalizing the statement!
      moviesStm.finalize();

        //seeding completed!
        console.log('Seeding completed');

        //closing DB
        DB.close();
});
};

  
seed();//calling the seed function