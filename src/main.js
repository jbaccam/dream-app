import './style.css';

const form = document.querySelector('form'); // grab the form from the dom

// list for the submit event
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevents page from reloading
    showSpinner();
    const data = new FormData(form); 

    // make a request to the api
    const response = await fetch('http://localhost:8080/dream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt'),
        }),
    });

    // wait to receive the image
    const { image } = await response.json();

    // add the image to the ui
    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width="512" />`;
    hideSpinner();
});

function showSpinner() {
    const button = document.querySelector('button');
    button.disabled = true;
    button.innerHTML = 'Generating... <span class="spinner">⚙️</span>';
  }
  
  function hideSpinner() {
    const button = document.querySelector('button');
    button.disabled = false;
    button.innerHTML = 'Generate';
  }
