const weatherForm = document.querySelector('#search-form');
const search = document.querySelector('#search-input');

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();

    messageOne.textContent = '';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
    
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent= data.error;
            } else {
                messageOne.textContent = data.forecast.temperature + ' ' + data.forecast.feelslike;
                messageTwo.textContent = data.location;
            }
        });
        
    });

});

