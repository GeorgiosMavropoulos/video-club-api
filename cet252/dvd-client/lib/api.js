//declare a variable to store api's url
const API_URL = process.env.NEXT_PUBLIC_URL;

//create a function to fetch api 
export async function apiFetch(endpoint)
{
  //create a variable to delegate the response received from the backend
  const respond = await fetch(`${API_URL}${endpoint}`);

  //throw an exception if receive didn't respond
  if(!response.ok){
    throw new Error('Backend does not respond');
  }

  //return the response in json format
  return response.json();
}