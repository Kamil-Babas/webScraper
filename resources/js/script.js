const searchButton = document.getElementById('searchButton');


searchButton.addEventListener('click', (e) => {

    e.preventDefault();
    let url = document.getElementById('urlInput').value;

    sendRequest(url)
});


function sendRequest(url)
{

    setDisplayNone();

    fetch('/api/scrape/url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({url: url})
    })
        .then(response => response.json())
        .then(data => {

            if (data.errors)
            {
                populateErrorsContainer(data.errors);
            }
            else
            {
                const websiteTitle = data.website_data.title ?? 'Website doesnt have title';
                const websiteDescription = data.website_data.meta_tags.description || 'Website doesnt have description set or description is an empty string';
                const h1Elements = data.website_data.header_tags.h1.length > 0 ? data.website_data.header_tags.h1 : 'There is no h1 elements on that website';
                const h2Elements = data.website_data.header_tags.h2.length > 0 ? data.website_data.header_tags.h2 : 'There is no h2 elements on that website';
                const h3Elements = data.website_data.header_tags.h3.length > 0 ? data.website_data.header_tags.h3 : 'There is no h3 elements on that website';

                console.log("title: ", websiteTitle);
                console.log("description: ", websiteDescription);
                console.log(h3Elements);
            }

        })
        .catch(error => {
            // console.error('Błąd:', error);
        });
}

function populateErrorsContainer(data){

    const errorsContainer = document.getElementById('errors_container');
    errorsContainer.style.display = 'block';

    const errorsListElement = document.getElementById('errors');
    errorsListElement.innerHTML = '';

    // populate list with errors
    for (const messages of Object.values(data)) {
        messages.forEach((msg) => {
            const li = document.createElement('li');
            li.textContent = msg;
            errorsListElement.appendChild(li);
        });
    }

}

// set display:none to [errorsContainer, ]
function setDisplayNone(){
    const errorsContainer = document.getElementById('errors_container');
    errorsContainer.style.display = 'none';
}
