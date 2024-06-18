//random excuse
$('.generate').click(() => {
    axios.get('http://localhost:3000/excuses')
    .then((response) => {
        const excuses = response.data;
        const numExcuses = excuses.length;
        
        if (numExcuses > 0) {
            const randomIndex = Math.floor(Math.random() * numExcuses);
            const randomExcuse = excuses[randomIndex].excuse;
            $('#excuse').text(randomExcuse);
            alert('gf')
        } else {
            $('#excuse').text("No excuses available.");
            alert('gf')
        }
    })
    .catch((error) => {
        console.error('Error fetching excuses:', error);
        alert('gf')
    });
});








