//displating all the excuses
axios.get('http://localhost:3000/excuses')
.then((res)=>{
    let excuses = res.data;
    for(let el of excuses){
        $('.excusesContainer').append(
            `<div class="excuse">${el.excuse}</div>`
        )
    }
})

//new excuses adding
$('#createExcuse').click(()=>{
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

//excuses editing
$('.editExcuse').click((e)=>{
    $('.editExcusePopup').css('display', 'flex')
    $('#closeEditPopup').click(()=>{
        $('.editExcusePopup').css('display', 'none')
    })
    let ID = e.target.id;
    if (ID.substring(0, 4) == 'edit') {
        ID = ID.substring(4);
        console.log(ID);

        $('.acceptChanges').click(()=>{
            let data = {
                excuse: $('#newExcuse').val(),
            };
            axios.put(`http://localhost:3000/edit-excuse/${ID}`, data)
                .then(res => {
                    $('.editExcusePopup').css('display', 'none')
                    location.reload();
                })
        })
    }
})