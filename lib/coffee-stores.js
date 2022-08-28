// initialixe unsplash
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
// import { photos } from 'unsplash-js/dist/internals';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASHH_ACCESS_KEY,
  fetch: nodeFetch,
});




const getUrlForCoffeeStores = (latlong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&exclude_all_chains=false&limit=${limit}`
}


const getListOfPhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 10,

      });
    
    const unsplashResults = photos.response.results;
    return unsplashResults.map(result => result.urls['small']);
    
}



export const fetchCoffeeStores = async () => {

const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_AUTHORIZATION
    //   Authorization: 'fsq37L1D7o6jeaWE6iHM57FRqawe3okHFjVcG3uRyowzn2I='
    }
  };
  
  const photos = await getListOfPhotos();
  const response = await fetch(
    getUrlForCoffeeStores(
        "41.8781%2C-87.6298",
        "coffee",
        6
        ),
    options)

  const data = await response.json();
  console.log(photos); 
  console.log(photos[0]); 

  return data.results.map((venue, idx) => {
    return {
        ...venue,
        imgUrl: photos[idx],
    }
  });

}