// Get DOM elements
const sentenceInput = document.getElementById('sentenceInput');
const processButton = document.getElementById('processButton');
const resultContainer = document.getElementById('resultContainer');

// Event listener for process button click
processButton.addEventListener('click', () => {
  const sentence = sentenceInput.value;

  // Clear previous results
  resultContainer.innerHTML = '';

  // Send sentence to server for processing
  fetch('api.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sentence })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error processing sentence');
    }
  })
  .then(processedData => {
    displayResults(processedData);
  })
  .catch(error => {
    console.error(error);
    resultContainer.textContent = 'An error occurred while processing the sentence.';
  });
});

// Function to display processed data
function displayResults(data) {
  const resultElement = document.createElement('p');
  resultElement.textContent = `Processed sentence: ${data.result}`;

  resultContainer.appendChild(resultElement);
}
