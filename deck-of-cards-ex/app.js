// $(function() {
//   let baseURL = 'https://deckofcardsapi.com/api/deck';

//   // 1.
//   $.getJSON(`${baseURL}/new/draw/`).then(data => {
//     let { suit, value } = data.cards[0];
//     console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
//   });

//   // 2.
//   let firstCard = null;
//   $.getJSON(`${baseURL}/new/draw/`)
//     .then(data => {
//       firstCard = data.cards[0];
//       let deckId = data.deck_id;
//       return $.getJSON(`${baseURL}/${deckId}/draw/`);
//     })
//     .then(data => {
//       let secondCard = data.cards[0];
//       [firstCard, secondCard].forEach(function(card) {
//         console.log(
//           `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
//         );
//       });
//     });

//   // 3.
//   let deckId = null;
//   let $btn = $('button');
//   let $cardArea = $('#card-area');

//   $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
//     deckId = data.deck_id;
//     $btn.show();
//   });

//   $btn.on('click', function() {
//     $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
//       let cardSrc = data.cards[0].image;
//       let angle = Math.random() * 90 - 45;
//       let randomX = Math.random() * 40 - 20;
//       let randomY = Math.random() * 40 - 20;
//       $cardArea.append(
//         $('<img>', {
//           src: cardSrc,
//           css: {
//             transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
//           }
//         })
//       );
//       if (data.remaining === 0) $btn.remove();
//     });
//   });
// });


document.addEventListener("DOMContentLoaded", function() {
  // Base URL for the API endpoint to interact with the deck of cards API
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1. Drawing a single card
  axios.get(`${baseURL}/new/draw/`)  // Send a GET request to draw a single card from a new deck
    .then(response => {
      // Destructuring to extract suit and value from the API response for the first card
      let { suit, value } = response.data.cards[0];
      // Log the card value and suit to the console in a readable format
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    })
    .catch(error => {
      // If there is an error drawing the card, log it to the console
      console.error("Error drawing card:", error);
    });

  // 2. Drawing two cards
  let firstCard = null;  // Variable to store the first card

  // Send a GET request to draw a single card from a new deck
  axios.get(`${baseURL}/new/draw/`)
    .then(response => {
      // Store the first card drawn in the firstCard variable
      firstCard = response.data.cards[0];
      // Store the deck ID from the response to use for further requests
      let deckId = response.data.deck_id;
      // Send another GET request to draw the second card from the deck using the deckId
      return axios.get(`${baseURL}/${deckId}/draw/`);
    })
    .then(response => {
      // Store the second card drawn from the response
      let secondCard = response.data.cards[0];
      // Log both the first and second cards' values and suits to the console
      [firstCard, secondCard].forEach(card => {
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
      });
    })
    .catch(error => {
      // If there is an error drawing the cards, log it to the console
      console.error("Error drawing cards:", error);
    });

  // 3. Shuffling the deck and drawing cards on button click
  let deckId = null;  // Variable to store the deck ID after shuffling
  const btn = document.querySelector('button');  // The button element that triggers card drawing
  const cardArea = document.getElementById('card-area');  // The container where drawn cards will be displayed

  // Send a GET request to shuffle a new deck and get a deck ID
  axios.get(`${baseURL}/new/shuffle/`)
    .then(response => {
      // Store the deck ID in the deckId variable
      deckId = response.data.deck_id;
      // Show the button by changing its display style (it was hidden before)
      btn.style.display = "block";  
    })
    .catch(error => {
      // If there is an error shuffling the deck, log it to the console
      console.error("Error shuffling deck:", error);
    });

  // Add an event listener to the button to draw a card when clicked
  btn.addEventListener('click', function() {
    // Send a GET request to draw a card from the shuffled deck using the stored deckId
    axios.get(`${baseURL}/${deckId}/draw/`)
      .then(response => {
        // Get the URL of the card's image from the response
        let cardSrc = response.data.cards[0].image;
        // Generate random values for card position and rotation
        let angle = Math.random() * 90 - 45;  // Random rotation angle between -45 and 45 degrees
        let randomX = Math.random() * 40 - 20;  // Random horizontal translation between -20 and 20 pixels
        let randomY = Math.random() * 40 - 20;  // Random vertical translation between -20 and 20 pixels

        // Create an img element to display the card image
        let img = document.createElement("img");
        img.src = cardSrc;  // Set the src attribute to the card's image URL
        // Apply transformation to the img element to position and rotate it
        img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;

        // Append the image to the card area where the cards are displayed
        cardArea.appendChild(img);

        // Check if no cards remain in the deck (remaining cards count is 0)
        if (response.data.remaining === 0) {
          // If no cards remain, remove the button from the page
          btn.remove();
        }
      })
      .catch(error => {
        // If there is an error drawing the card, log it to the console
        console.error("Error drawing card:", error);
      });
  });
});
