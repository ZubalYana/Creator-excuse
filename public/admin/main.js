//new excuses adding
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

//excuses deleting
$('.deleteExcuse').click((e)=>{
    console.log(e.target)
    let id = e.target.id;
    console.log(id)
    axios.delete(`http://localhost:3000/excuse/${id}`)
    .then(res => {
        location.reload()
    })
    })