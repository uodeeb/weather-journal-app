// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */



// /**_____________________________post the data to the server_________________________ */
(async () => {
    const rawResponse = await fetch('/get-data', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getUserData())
    });
    const content = await rawResponse.json();
  return content
    console.log(content);
  })();