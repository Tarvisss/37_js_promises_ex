
  


async function favNumAsync() {
    let favoriteNumAsync = 66;
    let apiURLAsync = "http://numbersapi.com"
    
    // let response = await axios.get(`${apiURLAsync}/${favoriteNumAsync}`);
    // let favNum = response.data;

    // The code above is equivalent the code below. Th code below uses destucturing.
    let {data: favNum} = await axios.get(`${apiURLAsync}/${favoriteNumAsync}`);
    console.log(favNum);

    let favNumXfour = await Promise.all(
        Array.from({ length: 4}, function(){
            return axios.get(`${apiURLAsync}/${favoriteNumAsync}?json`)
        })
    );

    console.log(favNumXfour);


    favNumXfour.forEach(favNum => {
        const div = document.createElement("div");
        div.textContent = favNum.data.text;
        document.body.appendChild(div);
    });
    
}
favNumAsync();
