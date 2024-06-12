//new exuces adding
$('.createExcuse').click(()=>{
    let data = {
        author: $('#author').val(),
        excuse: $('#excuse').val(),
    }
    axios.post('http://localhost:3000/add-excuse', data)
    .then(()=>{
        console.log(`Excuse data was sended successfully`)
    })

})