document.addEventListener('DOMContentLoaded', function() {
    // Function to handle clicks on attractions
    const setupAttractionHandlers = () => {
        const attractions = document.querySelectorAll('#attractions ul li');

        attractions.forEach(attraction => {
            attraction.addEventListener('click', function() {
                alert(`You clicked on ${this.innerText}`);
            });
        });
    };

    // Fetch and display Tokyo-specific information
    const fetchTokyoInfo = () => {
        // Example of setting a background image dynamically
        const cityImageDiv = document.getElementById('city-image');
        cityImageDiv.style.backgroundImage = "url('/path/to/tokyo/image.jpg')";

        // Example of fetching data (dummy function)
        // fetch('api/tokyo/attractions')
        //     .then(response => response.json())
        //     .then(data => displayAttractions(data))
        //     .catch(error => console.error('Error loading Tokyo attractions:', error));

        setupAttractionHandlers();
    };

    // Call the function to fetch data and set up the page
    fetchTokyoInfo();
});

// Function to display attractions dynamically
function displayAttractions(attractions) {
    const attractionsList = document.querySelector('#attractions ul');
    attractionsList.innerHTML = ''; // Clear existing list

    attractions.forEach(attraction => {
        const listItem = document.createElement('li');
        listItem.textContent = attraction.name;
        attractionsList.appendChild(listItem);
    });

    // After adding attractions to the list, set up click handlers
    setupAttractionHandlers();
}
