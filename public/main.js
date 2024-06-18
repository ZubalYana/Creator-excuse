//random excuse
$('.generate').click(() => {
    axios.get('http://localhost:3000/excuses')
    .then((response) => {
        const excuses = response.data;
        const numExcuses = excuses.length;
        
        if (numExcuses > 0) {
            const randomIndex = Math.floor(Math.random() * numExcuses);
            const randomExcuse = excuses[randomIndex].excuse;
            $('.excuseScreen').text(randomExcuse);
           
        } else {
            $('.excuseScreen').text("No excuses available.");
           
        }
    })
    .catch((error) => {
        console.error('Error fetching excuses:', error);
        
    });
});












