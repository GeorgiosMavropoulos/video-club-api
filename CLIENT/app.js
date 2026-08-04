//this file is the javascript code which connect the api with the website!


//creating a new function to redirect user back to the movie's gallery page each time he clicks on 'Gallery'
function redirect_to_movies_gallery(){
  //creating a variable to create a new element!
  const gallery_element = document.getElementById('back_to_movie_gallery');

  const row = document.createElement('div');
  row.className = "row";

  
  //creating the gallery html!
  gallery_element.innerHTML =
  `
  <a href = "/" class="text-decoration-none">
    <h2 class=" text-center ">Gallery </h2>
    </a>
  `;


}

//method to re-direct to add new movie page!
function navigate_to_add_Movie_Page(){
  //creating a variable to access the html element where the btn will be created!
  const add_new_movie_btn = document.getElementById('add_movie_page_btn')

  //creating the btn element!
  add_new_movie_btn.innerHTML=
  `
      <button class="btn btn-success" id="addMovieBtn" type="button">
   <i class="bi bi-plus-circle"></i> Add New Movie</button>
  `;

   document.getElementById('addMovieBtn').addEventListener('click', ()=>{//displaying the new page upon submit!
    window.location.href= 'add_movie.html';


  })
}


//getting the container element where movies will be displayed!
const display_movies_element = document.getElementById('moviesGrid');

//function to fetch all movies
function fetchMovies(){
    //using fetch to get data from the server.js
    fetch(`/movies`).then(response=>{
           //validating whether response is ok or returning error message!
           if(!response.ok){
            throw new Error(`HTTP error status:${response.status}`);
           }
           //if all goes well converting the data into json format!
           return response.json();

    })
    .then(data=>{//debugging to see the result
     console.log('Data received',data);

        //extracting the array with the movies from the api!
        const movies = data.movies;

        //clearing the container
        display_movies_element.innerHTML = '';

           //validating whether there are movies or not!
           if(!movies || movies.length === 0)
           {
            display_movies_element.innerHTML = '<p class="text-center">No movies found</p>';
            return;
           }
           //if all goes well and atleast 1 movie found...
           const container = document.createElement('div');//creating a container with bootstrap!
           container.className = 'container';//creating a container class!

           const row = document.createElement('div');//creating a row div!
           row.className = 'row';

           //looping through each movie!
           movies.forEach(movie=>{
            //creating a column for each movie card!
            const col = document.createElement('div');
            col.className = 'col-md-3 col-sm-6 mb-4';

            //creating the movie card!
            const movieCard = document.createElement('div');
            movieCard.className = 'card h-100 text-center';

            //adding movie's content. Title and image for the first page with an edit btn!
            movieCard.innerHTML = `


             <img src="${movie.image}"  class="card-img-top"   alt="${movie.title}"  style="height: 350px; object-fit: cover;">                    
             
            <div class = "card-body">
            <h5 class = "card-title">${movie.title}</h5>
            <button class="btn btn-warning btn-sm" onclick="editMovie(${movie.id})">
            <i class="bi bi-pencil"></i>Edit</button>
            </div>
            `;

            //appending the card to column!
            col.appendChild(movieCard);

            //appending column to row!
            row.appendChild(col);
           });
           //appending row to the container!
           container.appendChild(row);

           //appending containier to movies_element
           display_movies_element.appendChild(container);



    })
    //error handling if a fetching problem occurs!
    .catch(error=>{
        console.log('Error fetching movies:',error)//returning error message!
        display_movies_element.innerHTML = `
         <div class ="container">
          <div class="alert alert-danger text-center" role="alert">
           <strong>Error!</strong> Cannot not load movies.<br>
           Make sure server is running<br>
           <small>Error: ${error.message}</small>
          </div>
         </div>
        `;
    });
}





//creating a function called edit movie which it will get the selected's movie's id 
// in order to be able to display it's data on the edit page!
function editMovie(movieId)
{
    window.location.href = `edit_movie.html?id=${movieId}`
};


//creating a method to fetch a selected movie in order to be displayed on the edit's page!
//getting the container element where movies will be displayed!
const display_movie_element = document.getElementById('movieGrid');
function get_The_Specific_Movie_Which_Selected_Via_Edit_Click(){

    //getting movie's id from the url!
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

     //validating whether there are movies or not!
           if(!movieId)
           {
            display_movie_element.innerHTML = '<p class="text-center">No movies found</p>';
            return;
           }
    //using fetch to access the route /movies/:id
      //using fetch to get data from the server.js
    fetch(`/movies/${movieId}`).then(response=>{
           //validating whether response is ok or returning error message!
           if(!response.ok){
            throw new Error(`HTTP error status:${response.status}`);
           }
           //if all goes well converting the data into json format!
           return response.json();

    })
    .then(data=>{//debugging to see the result
     console.log('movie received',data);
     const movie = data.movie[0];//getting the first movie from the array
      //clearing the container
        display_movie_element.innerHTML = '';

       //if all goes well
           const container = document.createElement('div');//creating a container with bootstrap!
           container.className = 'container d-flex justify-content-center align-items-center min-vh-100';//creating a container class!

           const row = document.createElement('div');//creating a row div!
           row.className = 'row justify-content-center';

           //creating a column!
           const col = document.createElement('div')
           col.className = 'col-md-8';
             //creating the movie card!
             const movieCard  = document.createElement('div');
             movieCard.className = 'card shadow-lg';

             //creating the html structure of the card!
             movieCard.innerHTML = `
             <div class="row g-0">
             <div class = "col-md-5">
           
            <img src ="${movie.image}" class="img-fluid rounded-start" alt="${movie.title}" style="height: 100%; object-fit: cover;">
            </div>
            <div class ="col-md-7">
            <div class = "card-body">
            <h2 class ="card-title"${movie.title}></h2> 
            <hr>
            <p class ="card-text">
             <p class="card-text"><strong>Director: </strong>${movie.director}</p>
             <p class ="card-text"><strong>Release date: </strong>${movie.date}</p>
             <p class = "card-text"><strong>Plot: </strong>${movie.plot}</p>
             <p class ="card-text"><strong>Genre: </strong>${movie.genre}</p>
              <div class="mt-4 justify-content-center ">
               <button class="btn btn-primary w-100 mb-2 text-center" onclick="updateMovie(${movie.id})">
               <i class="bi bi-pencil"></i> Update  </button>
              
               <button class ="btn btn-danger w-100 mb-2 text-center" onclick="delMovie(${movie.id})">
                <i class="bi bi-trash"></i> Delete  </button>
                
              </div>
             </div>
             </div>
             </div>
             `;

             //appending card
             col.appendChild(movieCard);

             //appending the col to row!
             row.appendChild(col);

             //appending row to the container
             container.appendChild(row);

             //appending the container to the html doc!
             display_movie_element.appendChild(container);
            
    })
    //returning error msg if sth goes wrong!
    .catch(error=>{
      console.error('Error fetching the movie', error);
      display_movie_element.innerHTML = //returning error message if sth goes wrong!
      `
        <div class ="container">
          <div class="alert alert-danger text-center" role="alert">
           <strong>Error!</strong> Cannot not load movies.<br>
           Make sure server is running<br>
           <small>Error: ${error.message}</small>
          </div>
         </div>
        `;
    });
 
   

};

//function to make update button navigate to the update's page!
function updateMovie(movieId)
{
    window.location.href = `update.html?id=${movieId}`
};

//function to fetch movie's data!
function fetch_and_create_form(){

  //getting the form container!
  const update_movie_display = document.getElementById('form-container');

  //validating whether container exists or not!
  if(!update_movie_display)
  {
    console.error('Error, container does not exists');
    alert('Form does not exist');
return;
  }
//getting the movie id from the url!
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');//storing the id in a new variable!

//validating that movie's id exists on the url!
if(!movieId)
{
  console.error('Error: id does exist');
  alert('Error trying to retrieve movie details');
  return;
}

//Fetching movies details
fetch(`/movies/${movieId}`)
//converting data into json format!
.then(response=>response.json())
.then(data=>{//pushing data into a new array!
const movie = data.movie[0];//getting the first movie from the array!
createForm(movie,update_movie_display);//function to create the form!
})
//error handling
.catch(err=>{
  console.error(`Error trying to retrieve movie details,${err.message}`);
  alert("Error while trying to retrive movie's details");
  return;
});

}
//function to generate the update form!
function createForm(movie, update_movie_display)
{

    //creating a form element!
    const form = document.createElement('form')
   form.innerHTML =
  `    
     <div class = "mb-3 d-flex justify-content-center">
     <img src ="${movie.image}" class="img-fluid rounded-start" name="movie_image" id="image" alt="${movie.title}" style="height: 100%; object-fit: cover;">
     </div>
   
            
               <div class = "justify-content-left d-flex mb-3">
               <label for="category_id" class="form-label ">Category id:</label>
               <select id = "category_id" required>
                <option value="1" ${movie.category_id == 1 ? 'selected':''}>Comedy</option>
                <option value="2" ${movie.category_id == 2 ? 'selected':''}>Drama</option>
                <option value = "3" ${movie.category_id == 3 ? 'selected':''}>Action</option>
                <option value ="4" ${movie.category_id == 4 ? 'selected':''}>Horror</option>
                <option value = "5" ${movie.category_id == 5 ? 'selected':''}>Crime</option>
                <option value = "6" ${movie.category_id == 6 ? 'selected':''}>Documentary</option>
                </select>
            </div>

       <div class = "mb-3">
       <label for="movieTitle" class ="form-label">Title</label>
       <input type="text" class="form-control" id="movieTitle" name="title" value="${movie.title}" required>
       </div>
   

  
     <div class = "mb-3">
     <label for="movieDirector" class ="form-label">Director</label>
     <input type ="text" class="form-control" id="movieDirector" name="director" value="${movie.director}" required>
     </div>
   

  
    <div class = "mb-3">
       <label for="movieDate" class ="form-label">Release date</label>
<input type ="text" class="form-control" id="movieDate" name="date" value="${movie.date}" required>
    </div>
   

  
    <div class = "mb-3">
       <label for="plot" class ="form-label">Plot</label>
<textarea class="form-control" id="plot" name="plot"rows="6" cols="50" required>${movie.plot}</textarea>
    </div>
  
    <div clas

  
    <div class = "mb-3">
       <label for="genre" class ="form-label">Genre</label>
<input type ="text" class=" form-control" id="genre" name="genre" value="${movie.genre}" required>
    </div>

   
    <button class ="btn btn-primary w-100" type = "submit">Update</button>
   `;

   //appending the form to the form-container!
   update_movie_display.appendChild(form);

   //adding this event listener to enable on click function!
   form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting normally
        submitUpdate(movie.id);

});

//function to submit updated data!
function submitUpdate(movieId){

  //creating a new data set to send to the server!
  const updateMovie ={
 image:document.getElementById('image').src,
 category_id:document.getElementById('category_id').value,
 title:document.getElementById('movieTitle').value.trim(),
 director:document.getElementById('movieDirector').value.trim(),
 date:document.getElementById('movieDate').value.trim(),
 plot:document.getElementById('plot').value.trim(),
 genre:document.getElementById('genre').value.trim(),
 
  };
  

  //sending the update to the server!
  fetch(`/movies/${movieId}`,{
    method: 'Put',
    headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateMovie)//converting data to json format!
      
  })
  
  .then(response=>{
      //validating if the response is not ok!
      if(!response.ok)
      {
        return response.json().then(err=>{
          throw new Error(err.message);
       
        })
      }
      else{
        return response.json();//if all goes well returning data into json format!
      }
  })

  .then(data=>{
    console.log('Movie updated',data);
    alert("Movie has been updated with success!");
    window.location.href = '/';//redirecting to main page!
  })
  //if sth goes wrong!
  .catch(err=>{
    console.error(`Error:${err.message}`);
    alert('Error trying to update movie');
    return;
  });
 

}

 }


 //creating the event listener!
 document.addEventListener('DOMContentLoaded', ()=>{
  fetch_categories();//loading categories each time the DOM loads
 })
//method to fetch categories!
function fetch_categories()
{
  //fetching categories from the endpoint!
  fetch('/movies/categories').then(response=>{

    //returning error message if get no response from the server!
    if(!response.ok)
    {
      alert('Error with the server');
      throw new Error(`Error while trying to fetch the server:${response.status}`);
 
  }

  //if all goes well returning json in string format!
  return response.json();
})
.then(data=>{
  console.log(data);//debugging to see what we got back!

  //creating a new variable to store the categories!
  const categories = data.categories;

   //accessing the html document which will store the categories!
   const category_elements = document.getElementById('category_container');

   //clearing the elements!
   category_elements.innerHTML = "";

   //validating that categories will be found!
   if(!categories || categories.length === 0)
   {
    console.log('No categories found');
    alert('No categories found');
    return;
   }

   //if all goes well!

   //looping through each category!
   categories.forEach(category=>{
    //creating the btn!
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className  = 'btn category-btn'
    btn.textContent = category.category_name;
    btn.dataset.category_name = category.category_name;//storing the id to fetch movies later!
    category_elements.appendChild(btn);//appending btn to container
   });
//adding the on click event
category_elements.addEventListener('click', display_Movies_By_Category);
})
//returning error if sth goes wrong!
.catch(err=>{
  console.log('Error trying to fetch categories',err.message);
  alert('Error trying to fetch categories!');
})

};

 //method to display movies by category!
 function display_Movies_By_Category(event)
 {
    //validating that clicked element is btn!
    if(event.target.tagName === 'BUTTON')
    {
      //getting category name from the btn clicked!
      const category_name = event.target.dataset.category_name;

      //creating a session storate to store the the selected category!
      sessionStorage.setItem('selectedCategory',category_name);

      window.location.href = 'movies_by_category.html';

       }
 }

       //creating the method which load movies by category

     document.addEventListener('DOMContentLoaded', () =>{

      if(!document.getElementById('movies_by_category_grid'))//running this script only on display movies by category page!
      {
        return;
      }

      //storing category fetched from the click into a new variable!
      const category_name = sessionStorage.getItem('selectedCategory');

      //returning error msg if no category selected!
      if(!category_name)
      {
        console.log('No category selected');
        alert('Please select a category');
        return;
      }

      //fetching the movies!
      fetch(`/movies/categories/${category_name}`)
      .then(response => {
        if(!response.ok)
        {
          console.log('No response sent');
         throw new Error('Failed to get a response');
          
        }
        return response.json();//returning response in json format!
      
      })
      .then(data=>{
           //accessing the html block which movies will be displayed!
           const movies_element = document.getElementById('movies_by_category_grid');

           const movies = data.movies;//assigning data to movies, since the json response is an array!

           //clearing the page from previous result!
           movies_element.innerHTML = '';

           //returning error message if no movies found!
           if(!movies || movies.length===0)
           {
            console.log('Error, no movies found');
           throw new Error('No movies found belonging to this category');
          
           
           }


           //creating a new html div
           const row = document.createElement('div');
           row.className = 'row';//giving it's own bootstrap class name!

           //looping through the movies!
           movies.forEach(movie=>{
            //creating the col div!
            const col = document.createElement('div');
            col.className = 'col-md-3 col-sm-6 mb-4';
          

           //creating the movie card!
           const movieCard = document.createElement('div');
           movieCard.className = 'card h-100 text-center';

           //populating the card with html elements and data!
           movieCard.innerHTML = 
           `
               <img src="${movie.image}"
            class="card-img-top" 
            alt="${movie.title}"
            style="height: 350px; object-fit: cover;">
            <div class = "card-body">
            <h5 class = "card-title">${movie.title}</h5>
            <button class="btn btn-warning btn-sm" onclick="editMovie(${movie.id})">
            <i class="bi bi-pencil"></i>Edit</button>
            </div>
           `;

           //appending the movie card to the row!
           col.appendChild(movieCard);

           //appending the row to the col
           row.appendChild(col);

                  //appending col to the main element!
                  movies_element.appendChild(col);
            })
           
      })
      //error handling
      .catch(err=>{
        console.log('Error while trying to set up the html structure and fetch movies');
        alert('Error while trying to display the movies');
          window.location.href = '/';//returning to the main page!
      })

     });
      
      

 //method to delete a movie!
 function delMovie(movieId)
 {
   //fetching the movie's id from the url param!
   const urlParams = new URLSearchParams(window.location.search);


   //declaring this variable to store movie's id!
   const id= urlParams.get('id');




   //returning an error message if there is no id on params!
   if(!id)
   {
    console.error('Error:No id found on params');
    alert('No id found on url');
    return;
   }


   //asking from user to validate whether or not he wants to delete the movie!
   const confirmed = confirm('Are you sure that you want to delete the specific movie?');


   if(!confirmed)
   {
    alert('Movie will not be deleted');
    return;
   }


   //if all goes well fetching the delete method!
   fetch(`/movies/${movieId}`,{
       method: 'Delete',//fetching the delete method!
    headers: {
        'Content-Type': 'application/json'
      },
  
   })
      .then(response=> {
      if(!response.ok)//if movie has been deleted, returning success message!
      {
        return response.json.then(err=> {throw new Error(err.message);})
           
      }
      return response.json();
      })
      .then(data=>{


      alert('Movie has been deleted with success');
      window.location.href ="/";


      })
      //error handling!
      .catch(err=>{
        console.log("Error while trying to delete the movie",err.message);
        alert('Error while trying to delete the movie');
        return;
      })
      
   


 }

 //creating a new fetch fucntion to enable user insert a new category!
 function add_category(){

  //fetching the user's inputs from the form!
  
const category_name = document.getElementById('categoryName').value.trim();

//returning error message if input is empty!
if(!category_name)
{
  console.log('Error category name is empty');
  alert(`Please add category's name`);
  return;
}
  //creating the new category object!
  const new_movie ={category_name};
   
//validating what data is being sent to the server!
console.log(new_movie)
 //fetching the api endpoint!
 fetch('/movies/categories',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},

      //converting data into a string format!
      body: JSON.stringify(new_movie),

 })
 .then(response=>{//sending the response!

  //returning error message if category already exist!
  if(response.status === 400)
  {
    console.log(`Error, category already exist:${response.status}`);
    alert('Category already exist')
    throw new Error('Category already exists')
  }
  //returning error message if not receive response from the server!
  if(!response.ok)
  {
    console.log(`Error getting response from the server:${response.status}`);
    alert('Error trying to communicate with server');
     throw new Error('Server is not responding');
  }
    //returning response into json format!
  return response.json();
 })
 .then(data=>{

  //returning success message!
  console.log(`Success category has been created:${new_movie}`);
  alert('New category has been added with success');
    //redirect to main page uppon successfull category creation!
    window.location.href ='/';
 })
.catch(error=>{
  console.log(`Error while trying to create the category:${new_movie}`,error.message);
  alert(`Error while trying to create the new category`,error.message);
  //redirect to main page uppon successfull category creation!
    window.location.href ='/';
})

 

 };


 //adding event listener to the search button in html page!
 document.addEventListener('DOMContentLoaded', () =>{
  //creating a variable to store search bar's text!
  const searchInput = document.getElementById('searchInput');
   //creating a variable to store search button's content!
   const searchBtn = document.getElementById('searchBtn');

   //adding the event listener to the btn!
   searchBtn.addEventListener('click', ()=>{
    //creating a variable to store the query!
    const query = searchInput.value.trim();

    //returning error msg if query does didn't send or is empty!
    if(!query)
    {
      console.log('Error fetching data from the search bar!')
      alert('Search bar is empty');
      return;
    }

    //calling the method below to get movie results
    search_movie_by_title(query);


  
   });
 })

   //allowing enter to send the bar!
    searchBtn.addEventListener('keydown', e=>{
      if(e.key === 'Enter')
      {
        searchInput.click();
      }
    })

 //function to retrieve a movie's details by typing its title on search bar to  display the movie on edit page!!
 function search_movie_by_title(title){

  //fetch method to get the data from the API!
  fetch(`/movies/title/${encodeURIComponent(title)}`)
  .then(response=>{
    
    //returning error message api didn't send a response!
    if(!response.ok)
    {
       alert('Movie not found!');
      throw new Error("Couldn't get a response from the server");
     
      return;
    }

    //returning error message if title is null!
    if(!title)
    {
      console.log('title is null');
      alert('Please provide a title');
      return;
    }

    //converting response into a string!
    return response.json();
  

  })
  .then(data=>{
    const movie = data.movie[0];//retrieving the first movie which shows up!

    //redirecting to edit page to display movie's details!
    window.location.href = `edit_movie.html?id=${movie.id}`;
  })
  .catch(err=>{
    console.log('Error while tried to fetch the movie');
    alert('Error cannot retrieve the movie');
    return;
  })

 }




//creating the function to fetch post endpoint and enable user to add a movie!
function add_movie(){
  

  //fetching the values from the form!

  //creating an array to store the values!
 
   const  category_id = document.getElementById('category_id').value.trim();
   const image = document.getElementById('image').value.trim();
   const title= document.getElementById('title').value.trim();
  const director= document.getElementById('director').value.trim();
  const date= document.getElementById('date').value.trim();
  const plot = document.getElementById('plot').value.trim();
   const genre = document.getElementById('genre').value.trim();

 

  //returning error message if fields are null!
  if(!category_id||!image|| !title || ! director || !date || !plot || !genre)
  {
    console.log('A field is empty');
    alert('Please complete  all inputs');
    return;
  }

  //creating the new movie object!
  const new_movie ={
     category_id: parseInt(category_id),//parsing number to string
     image,
     title,
     director,
     date,
     plot,
     genre


  };
  //validating what I am sending to the api!
 console.log('Sending movie data:', new_movie);
 
  //now login to fetch the post method in order to send the movies to the server!
  fetch('/movies/create',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},

      //converting data into a string format!
      body: JSON.stringify(new_movie),
  })
  .then(response=>{
     //returning error message if server does not send a response!
  if(!response.ok)
  {
    console.log("Error");
    alert('Error: Cannot add the new movie');
    throw new Error('Server is not responding');
  }

    //returning response into a json format!
    return response.json();

  })
 
  .then(data=>{
      
  alert('Success movie added');//returning success msg if movie has been added!
    //clearing form after success!
 document.getElementById('add_movie_form').reset();
  })



 
.catch(err=>{
 console.log('Error while trying to post the movie',err.message);
  alert('Error. Movie cannot be added');
  return;
})

 

}


  //function to delete a specific category!
  function delete_category(){
    //getting category's name from the input!
    const delete_category_name = document.getElementById('category_name_to_delete').value.trim();

    //returning an error message if category_name field is empty!
    if(!delete_category_name)
    {
      console.log('Error input is empty');
      alert(`Please enter category's name to delete`);
      return;
    }

   

    //asking user to confirm whether he wants to delete the category or not!
      //asking from user to validate whether or not he wants to delete the movie!
   const confirmed = confirm('Are you sure that you want to delete this specific category?');


   if(!confirmed)
   {
    alert('Category will not be deleted');
    return;
   }

   //if user confirms then fetching the delete category endpoint!
   fetch(`/movies/categories/del/${delete_category_name}`,{
      method: 'Delete',//fetching the delete method!
    headers: {
        'Content-Type': 'application/json'
      },
   })
   //getting the response!
   .then(response=>{
    if(response.status === 404)
    {
      alert('Category does not exist')
      throw new Error('Category does not exist')
    }

    //returning error message if server does not respond!
    if(!response.ok)
    {
      console.log('Error while trying to communicate with the server');
      alert('Error cannot establish a connection with server');
       throw new Error('Empty response from endpoint!')
    }
   })
   //if all goes well sending the data!
   .then(data=>{
    
    
    //returning success message!
    console.log('Category has been deleted');
    alert('Category has been deleted with success');
    window.location.href = '/';//re-directing to home page uppon successful delete process!
   })
   //returning error message if category cannot be deleted!
   .catch(err=>{
    console.log('Error, cannot delete the category');
    alert('Category could not be deleted');
    return;
   })
  }
 
  





//waiting for DOM to load and added page guards!!
window.addEventListener('DOMContentLoaded',function ()
{
  navigate_to_add_Movie_Page();//calling this method on page load!

redirect_to_movies_gallery();//displaying gallery btn

  if(display_movies_element)//this fucntions displays all movies at the HomePage!
{
fetchMovies();//calling the function to fetch movies!
};


if(display_movie_element)//if user clicks on edit button this function is being called to display the selected movie!
{



       get_The_Specific_Movie_Which_Selected_Via_Edit_Click();



};


//if user clicks on update btn and this html element loads create update form functions is being called!
if(document.getElementById('form-container'))
{
fetch_and_create_form();
};

})


