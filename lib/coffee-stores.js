const getUrlForCoffeeStores = (latlong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&exclude_all_chains=false&fields=name%2Cfsq_id%2Cphotos&limit=${limit}`
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
  
  const response = await fetch(
    getUrlForCoffeeStores(
        "41.8781%2C-87.6298",
        "coffee",
        6
        ),
    options)

  const data = await response.json();
  console.log(data); 

  return data.results;

}