document.addEventListener('DOMContentLoaded', function() {
    // Example interaction: Log clicks on attractions
    const attractionsList = document.querySelectorAll('#attractions ul li');
    attractionsList.forEach(attraction => {
        attraction.addEventListener('click', function() {
            console.log(`You clicked on: ${attraction.innerText}`);
        });
    });
});
