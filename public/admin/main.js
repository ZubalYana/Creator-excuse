//displating all the excuses
axios.get('http://localhost:3000/excuses')
.then((res)=>{
    let excuses = res.data;
    let excusesLength = excuses.length;
    console.log(excusesLength)
    $('.exusesLength').html(`Список всіх відмазок ( ${excusesLength} )`);
    for(let el of excuses){
        $('.excusesContainer').append(
            `<div class="excuse">
                <div class="excuseTextCon">
                                <div class="excuseText">${el.excuse}</div>
                                <div class="excuseAuthor">${el.author}</div>
                </div>

                                        <div class="excuse_actions">

                            <div class="excuse_edit excuse_action">
                                <img src="./Imgs/edit action.png" alt="edit" class="edit_icon" id="edit${el._id}">
                            </div>
                            <div class="excuse_delete excuse_action">
                                <img src="./Imgs/bin top.png" alt="delete top" class="excuse_deleteTop">
                                <img src="./Imgs/bin bottom.png" alt="delete bottom" id="${el._id}" class="deleteExcuse">
                            </div>
                        </div>
            </div>`
        )
    }


//hover animations
$('.excuse_edit').hover(
    function () {
        $(this).css('transform', 'rotate(-20deg)');
    },
    function () {
        $(this).css('transform', 'rotate(0deg)');
    }
);
$('.excuse_delete').hover(
    function () {
        $(this).find('.excuse_deleteTop').addClass('delete-hover');
    },
    function () {
        $(this).find('.excuse_deleteTop').removeClass('delete-hover');
    }
); 

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
$('.edit_icon').click((e)=>{
    $('.excusesEditingPopupCon').css('display', 'flex')
    $('.editPopupxmark').click(()=>{
        $('.excusesEditingPopupCon').css('display', 'none')
    })
    let ID = e.target.id;
    if (ID.substring(0, 4) == 'edit') {
        ID = ID.substring(4);
        console.log(ID);

        $('.acceptChanges').click(()=>{
            let data = {
                excuse: $('#newExcuse').val(),
                author: $('#author').val(),
            };
            axios.put(`http://localhost:3000/edit-excuse/${ID}`, data)
                .then(res => {
                    $('.excusesEditingPopupCon').css('display', 'none')
                    location.reload();
                })
        })
    }
})

})

//new excuses adding
$('#createExcuse').click(()=>{
    if($('#author').val() != '' && $('#excuse').val() != ''){
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
    }else{
        $('.errorMessage_con').css('display', 'flex')
        $('.errorMessage').html('<i class="fa-solid fa-circle-exclamation explamationCircle"></i><p class="errorMessage_text">Заповніть необхідну інформацію!</p>')

        setTimeout(() => {
            $('.errorMessage_con').css('display', 'none')
        }, 2000);
    }


})



//theme changing
let theme = localStorage.getItem('theme') || 'light';
$('.themeChanger').click(function(){
    if(theme == 'light'){
        theme = 'dark';
        localStorage.setItem('theme', theme);
        changeTheme(theme);

    }else{
        theme = 'light';
        localStorage.setItem('theme', theme);
        changeTheme(theme);
    }
})
function changeTheme(theme){
    if(theme == 'light'){
        $('.themeChanger').css('justify-content', 'flex-start')
        $('.wrap').css('background-color', '#fff')
        $('h3').css('color', '#000')
        $('h4').css('color', '#000')
        $('.header_notificationsCircle').css('background-color', '#000')
        $('.header_notificationsCircle').css('box-shadow', '0 0 1px 1px rgba(0, 0, 0, 0.72)')
        $('.menu_logo').attr('src', './Imgs/LogoLight.png')
        $('#homePage').css('background-color', '#F5A006')
        $('#adminPage').css('color', '#F5A006')
        $('.menu_logo').attr('src', './Imgs/LogoLight.png')
        $('.personIcon').attr('src', './Imgs/person icon.png')
        $('.BoxThemeChanger').css('background-color', '#fff')
        $('.themeChanger').css('background-color', '#E2E2E2')
        $('.themeChanger_circle').css('background-color', '#FFC700')
        $('.themeChanger_circle').css('border', 'solid 0.5px #F5A006')

    }else{
        $('.themeChanger').css('justify-content', 'flex-end')
        $('.wrap').css('background-color', '#000')
        $('h3').css('color', '#fff')
        $('h4').css('color', '#fff')
        $('.header_notificationsCircle').css('background-color', '#fff')
        $('.header_notificationsCircle').css('box-shadow', 'rgba(255, 255, 255, 0.72)')
        $('.menu_logo').attr('src', './Imgs/LogoDark.png')
        $('#homePage').css('background-color', ' #F5A006')
        $('#adminPage').css('color', '#000')
        $('.personIcon').attr('src', './Imgs/person icon dark.png')
        $('.BoxThemeChanger').css('background-color', '#000')
        $('.themeChanger').css('background-color', '#3B3B3B')
        $('.themeChanger_circle').css('background-color', '#8C8C8C')
        $('.themeChanger_circle').css('border', 'none')
    }
}
changeTheme(theme);







document.addEventListener('DOMContentLoaded', function() {
    const garButton = document.querySelector('.gar');
    const settingsMenu = document.querySelector('.settingsMenu');

    garButton.addEventListener('click', function() {
        const menuVisible = settingsMenu.style.right === '0px';

        if (!menuVisible) {
            settingsMenu.style.right = '0px'; 
        } else {
            settingsMenu.style.right = '-336px'; 
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const settingsMenu = document.querySelector('.settingsMenu');
    const garCloseIcon = document.querySelector('.garClose');


    garCloseIcon.addEventListener('click', function() {
        settingsMenu.style.right = '-336px'; 
    });
});
