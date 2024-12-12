document.addEventListener('DOMContentLoaded', () => {
    const attractionsList = document.querySelector('#attractions ul');

    attractionsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            alert(`You clicked on ${event.target.innerText}`);
        }
    });
});
