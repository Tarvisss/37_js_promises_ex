document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    document.getElementById('numberForm').addEventListener('submit', function(event) {
      event.preventDefault();  // Prevent the form from refreshing the page
  
      // Get the numbers from the input field (comma-separated string)
      const numbersInput = document.getElementById('numbers').value;
  
      // Split the numbers by commas and trim whitespace
      
      const numbers = numbersInput.split(',').map(num => num.trim());
  
      // Clear previous results and remove any dynamically added divs
      numbers.forEach(num => {
        const div = document.getElementById(`number${num}`);
        if (div) {
          div.textContent = '';  // Clear previous trivia
        } else {
          // If the div doesn't exist, create a new one
          const newDiv = document.createElement('div');
          newDiv.id = `number${num}`;
          document.body.appendChild(newDiv);
        }
      });
  
      // Make requests for each number
      numbers.forEach(number => {
        axios.get(`http://numbersapi.com/${number}/trivia?notfound=floor&fragment`)
          .then(res => {
            console.log(res);  // Log the response for each request
            const triviaText = `${number}: ${res.data}`;
  
            // Assign trivia data for each number to its respective div
            // The comment below is how to equivalent to the code directly below, only the commented code is using jquery
            // document.getElementById(`number${number}`).textContent = triviaText;
            const numberElement = document.getElementById(`number${number}`);
            if (numberElement){
              numberElement.textContent = triviaText;
            }
          })
          .catch(err => {
            console.log(`Error for number ${number}:`, err);  // Log the error for each request
            document.getElementById(`number${number}`).textContent = `Sorry, no trivia found for ${number}.`;
          });
      });
    });
  });
  