
const searchButton = document.getElementById('searchButton');


searchButton.addEventListener('click', (e) => {

    e.preventDefault();
    let url = document.getElementById('urlInput').value;

    fetch('/api/scrape/url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ url: url })
    })
        .then(response => response.json())
        .then(data => {
            data.website_data.links.forEach((link, index) => {
                console.log(index, link);
            });
        })
        .catch(error => console.error('Błąd:', error));
});
