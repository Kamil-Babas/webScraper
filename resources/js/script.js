const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', (e) => {

    e.preventDefault();

    let url = document.getElementById('urlInput').value;
    let imagesCheckbox = document.getElementById('imagesCheckbox').checked;

    sendRequest(url, imagesCheckbox);

});


function sendRequest(urlToScrape, scrapeWithImagesBool)
{
    setDisplayNone();
    startLoadingAnimation();

    fetch('/api/scrape/url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
            url: urlToScrape,
            scrapeWithImages: scrapeWithImagesBool
        })
    })
        .then(response => response.json())
        .then(data => {

            if (data.errors)
            {
                populateErrorsContainer(data.errors);
                stopLoadingAnimation();
            }
            else
            {
                const websiteTitle = data.website_data.title ?? 'Website doesnt have title';
                const websiteDescription = data.website_data.meta_tags.description || 'Website doesnt have description set or description is an empty string';

                const h1Elements = data.website_data.header_tags.h1;
                const h2Elements = data.website_data.header_tags.h2;
                const h3Elements = data.website_data.header_tags.h3;

                const links = data.website_data.links;

                setTitle(websiteTitle);
                setDescription(websiteDescription);

                populateHeaderList(h1Elements, 'h1_list');
                populateHeaderList(h2Elements, 'h2_list');
                populateHeaderList(h3Elements, 'h3_list');

                populateLinksList(links);

                if(scrapeWithImagesBool){
                    const images = data.website_data.images;
                    populateImagesContainer(images);
                }

                stopLoadingAnimation();
            }

        })
        .catch(error => {
            // console.error('Błąd:', error);
        });
}

function populateErrorsContainer(errors){

    const errorsContainer = document.getElementById('errors_container');
    errorsContainer.style.display = 'block';

    const errorsList = document.getElementById('errors');
    errorsList.innerHTML = '';

    // populate list with errors
    for (const messages of Object.values(errors)) {
        messages.forEach((msg) => {
            const li = document.createElement('li');
            li.textContent = msg;
            errorsList.appendChild(li);
        });
    }

}

// set display:none to containers
function setDisplayNone(){

    const containers = [
        document.getElementById('errors_container'),
        document.getElementById('h1Container'),
        document.getElementById('h2Container'),
        document.getElementById('h3Container'),
        document.getElementById('websiteDetailsContainer'),
        document.getElementById('linksContainer'),
        document.getElementById('imagesContainer'),
    ];

    containers.forEach(container => {
        container.style.display = "none";

        // Find and close <details> if it exists
        const details = container.querySelector('details');
        if (details) {
            details.open = false;
        }
    });

}

function setTitle(title) {

    const container = document.getElementById('websiteDetailsContainer');
    container.style.display = 'block';

    const titleElement = document.getElementById('website_title');
    titleElement.innerText = title;

}

function setDescription(description) {

    const descriptionElement = document.getElementById('website_description');
    descriptionElement.innerText = description;

}

function populateHeaderList(headersArray, listId){

    const headerName = listId.split('_')[0];

    const list = document.getElementById(listId);
    list.innerHTML = "";

    const container = document.getElementById(headerName + 'Container')
    container.style.display = 'block';

    if(headersArray.length > 0)
    {
        headersArray.forEach(header => {

            const li = document.createElement('li');
            li.classList.add('header-li');

            li.textContent = header;
            list.appendChild(li);

        });
    }
    else
    {
        const li = document.createElement('li');

        li.classList.add('bg-red');
        li.textContent = `This website doesnt have <${headerName}> elements`;

        list.appendChild(li);
    }

}

function populateLinksList(linksArray){

    const list = document.getElementById('links_list');
    list.innerHTML = "";

    const container = document.getElementById('linksContainer');
    container.style.display = 'block';

    if(linksArray.length > 0)
    {
        linksArray.forEach(link => {

            const li = document.createElement('li');
            const linkElement = document.createElement('a');

            linkElement.href = link.url;
            linkElement.text = link.text || 'text property was not set on website'
            linkElement.target = 'blank';

            li.classList.add('header-li')
            li.appendChild(linkElement);

            list.appendChild(li);

        });
    }
    else
    {
        const li = document.createElement('li');

        li.classList.add('bg-red');
        li.textContent = 'This website doesnt have <a> elements';

        list.appendChild(li);
    }

}

function populateImagesContainer(imagesArray) {

    const noImagesText = document.getElementById('noImagesText');
    noImagesText.style.display = 'none';

    const imagesFlexContainer = document.getElementById('imagesFlexContainer');
    imagesFlexContainer.innerHTML = "";

    const container = document.getElementById('imagesContainer');
    container.style.display = 'block';

    if(imagesArray.length > 0)
    {
        imagesArray.forEach(image => {

            if(image.url !== null){

                const imageElement = document.createElement('img');
                imageElement.src = image.url;
                imageElement.alt = image.alt ?? '';
                imageElement.loading = 'lazy';

                imagesFlexContainer.appendChild(imageElement);
            }

        })
    }
    else
    {   // Displays that there is no images on scrapped website
        noImagesText.style.display = 'block';
    }

}

function startLoadingAnimation() {
    const loader = document.getElementById('loadingAnimation');
    loader.classList.add('active');
}

function stopLoadingAnimation(){
    const loader = document.getElementById('loadingAnimation');
    loader.classList.remove('active');
}
