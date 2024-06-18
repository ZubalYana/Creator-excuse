//displating all the excuses
axios.get('http://localhost:3000/excuses')
.then((res)=>{
    let excuses = res.data;
    for(let el of excuses){
        $('.excusesContainer').append(
            `<div class="excuse">
                <div class="excuseText">${el.excuse}</div>
                                        <div class="excuse_actions">
                            <div class="excuse_edit excuse_action">
                                <img src="./Imgs/edit action.png" alt="edit">
                            </div>
                            <div class="excuse_delete excuse_action">
                                <img src="./Imgs/bin top.png" alt="delete top">
                                <img src="./Imgs/bin bottom.png" alt="delete bottom">
                            </div>
                        </div>
            </div>`
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
        $('#author').val()
        $('#excuse').val()
        location.reload();
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