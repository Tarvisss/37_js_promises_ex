



//Set varibles for the URL and for your Favorite number//

let favoriteNum = 66;
let apiURL = "http://numbersapi.com";

axios.get(`${apiURL}/${favoriteNum}?json`)

.then(response => {
  console.log(response.data);
})

Promise.all(
  Array.from({ length: 4}, function() {
    return axios.get(`${apiURL}/${favoriteNum}?json`);
  })
  )
  .then(function(responses){
    responses.forEach(function(response){
      const div = document.createElement("div");
      div.textContent = response.data.text;
      document.body.appendChild(div);
    });
  })
  .catch(function(error){
    console.error("error getting data", error);
  });
