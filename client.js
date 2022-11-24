

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const twitsElement = document.querySelector('.twits');
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/twits' : 'https://twittercloneserver.onrender.com/twits';

loadingElement.style.display ='';

listAllTwits();


form.addEventListener('submit', (Event) => {
    Event.preventDefault();
    const formData = new FormData(form); 
    const name = formData.get('name');
    const content = formData.get('content');

    const twit = {
        name,
        content
    }
    

    form.style.display = 'none';
    loadingElement.style.display = '';
//submitting
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(twit),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdTwit => {
    
        form.reset();
        setTimeout(()=> {
            form.style.display = '';

        }, 30000);
        form.style.display = '';
        listAllTwits();
      });
});

function listAllTwits() {
    twitsElement.innerHTML = '';
    fetch(API_URL)
    .then(response => response.json())
    .then(twits => {
    
        twits.reverse();
        twits.forEach(twit => {
            const div = document.createElement('div');
            const header = document.createElement('h3');
            header.textContent = twit.name;

            const contents = document.createElement('p');
            contents.textContent = twit.content;

            const date = document.createElement('small');
            date.textContent = new Date(twit.created);

            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);

            twitsElement.appendChild(div);
        });
        loadingElement.style.display = 'none';
    });

} 
    