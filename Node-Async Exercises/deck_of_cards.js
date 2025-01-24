async function deckOfCards() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    let response = await axios.get(`${baseURL}/new/draw`)
    let {suit, value} = response.data.cards[0];

    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)

    let firstCard = null; 
}
// Draw two cards.
async function drawTwoCards(){
    let baseURL = 'https://deckofcardsapi.com/api/deck';
    let response1 = await axios.get(`${baseURL}/new/draw/`);
    let firstCard = response1.data.cards[0];
    let deckId = response1.data.deck_id;
    let response2 = await axios.get(`${baseURL}/${deckId}/draw/`);
    let secondCard = response2.data.cards[0];
    [firstCard, secondCard].forEach(card => {
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
    });
}

// Shuffling the deck and drawing cards on click



async function shuffleAndDraw() {
    let deckId = null
    const button = document.querySelector('button');
    const cardArea = document.getElementById('card-area');
    let baseURL = 'https://deckofcardsapi.com/api/deck'
    let response1 = await axios.get(`${baseURL}/new/shuffle/`)

    if (response1){
        deckId = response1.data.deck_id;
        button.style.display = "block"
    }

    button.addEventListener('click', async function() {
        let response2 =  await axios.get(`${baseURL}/${deckId}/draw/`)

        if (response2) {
            let cardSrc = response2.data.cards[0].image;



            let img = document.createElement("img");
            img.src = cardSrc;
            

            cardArea.appendChild(img);

            if (response2.data.remaining === 0){
                button.remove();
            }
        }
    });
}

shuffleAndDraw();


// async function shuffleAndDrawCards() {
//     let deckId = null;  // Variable to store the deck ID after shuffling
//     const btn = document.querySelector('button');  // The button element that triggers card drawing
//     const cardArea = document.getElementById('card-area');  // The container where drawn cards will be displayed
//     const baseURL = 'https://deckofcardsapi.com/api/deck';  // The base URL for the API
    
//     // Send a GET request to shuffle a new deck and get a deck ID
//     let response1 = await axios.get(`${baseURL}/new/shuffle/`)
//       .catch(error => console.error("Error shuffling deck:", error)); // Handle error if shuffling fails
    
//     if (response1) {
//       // Store the deck ID in the deckId variable
//       deckId = response1.data.deck_id;
//       // Show the button by changing its display style (it was hidden before)
//       btn.style.display = "block";
//     }
  
//     // Add an event listener to the button to draw a card when clicked
//     btn.addEventListener('click', async function() {
//       // Send a GET request to draw a card from the shuffled deck using the stored deckId
//       let response2 = await axios.get(`${baseURL}/${deckId}/draw/`)
//         .catch(error => console.error("Error drawing card:", error)); // Handle error if drawing a card fails
  
//       if (response2) {
//         // Get the URL of the card's image from the response
//         let cardSrc = response2.data.cards[0].image;
//         // Generate random values for card position and rotation
//         let angle = Math.random() * 90 - 45;  // Random rotation angle between -45 and 45 degrees
//         let randomX = Math.random() * 40 - 20;  // Random horizontal translation between -20 and 20 pixels
//         let randomY = Math.random() * 40 - 20;  // Random vertical translation between -20 and 20 pixels
  
//         // Create an img element to display the card image
//         let img = document.createElement("img");
//         img.src = cardSrc;  // Set the src attribute to the card's image URL
//         // Apply transformation to the img element to position and rotate it
//         img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
  
//         // Append the image to the card area where the cards are displayed
//         cardArea.appendChild(img);
  
//         // Check if no cards remain in the deck (remaining cards count is 0)
//         if (response2.data.remaining === 0) {
//           // If no cards remain, remove the button from the page
//           btn.remove();
//         }
//       }
//     });
//   }
  
//   // Call the function to shuffle the deck and add the event listener for drawing cards
//   shuffleAndDrawCards();
  