const API_URL = 'http://localhost:8000/v1';
async function httpGetPlanets() {
  // TODO: Once API is ready.
  const response = await fetch(API_URL + '/planets')
  // Load planets and return as JSON.
  return await response.json()
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  const response = await fetch(API_URL + '/launches');
  // Load launches, sort by flight number, and return as JSON.
  const fetchedLaunches = await response.json();

  return fetchedLaunches.sort((a,b) => {
    // this is a comparator function just like priority queue
    return a.flightNumber - b.flightNumber;
  })
}

// TODO: Once API is ready.
  // Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_URL}/launches`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch),
    })
  }catch(error){
    return {ok:false};
  }
  
}

// TODO: Once API is ready.
  // Delete launch with given ID.
async function httpAbortLaunch(id) {
  try{
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete"
    })
  }catch(err){
    console.log(err);
    return {
      ok:false
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};