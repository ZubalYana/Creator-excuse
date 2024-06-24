// random excuses and history
$(document).ready(function() {
    loadHistoryFromLocalStorage();

    $('.generate').click(() => {
        axios.get('http://localhost:3000/excuses')
        .then((response) => {
            const excuses = response.data;
            const numExcuses = excuses.length;

            if (numExcuses > 0) {
                const randomIndex = Math.floor(Math.random() * numExcuses);
                const randomExcuse = excuses[randomIndex].excuse;
                $('.excuseScreen').text(randomExcuse);

                addToHistory(randomExcuse);
            } else {
                $('.excuseScreen').text("No excuses available.");
            }
            $('.excuse_delete').hover(
                function () {
                    $(this).find('.excuse_deleteTop').addClass('delete-hover');
                },
                function () {
                    $(this).find('.excuse_deleteTop').removeClass('delete-hover');
                }
            ); 
        })
        .catch((error) => {
            console.error('Error fetching excuses:', error);
        });
    });
    $('.excuse_delete').hover(
        function () {
            $(this).find('.excuse_deleteTop').addClass('delete-hover');
        },
        function () {
            $(this).find('.excuse_deleteTop').removeClass('delete-hover');
        }
    ); 

    $('.historyList').on('click', '.bookmarkBtm', function(event) {
        event.stopPropagation();

        let excuseText = $(this).closest('li').find('.historyListLiLeft h2').text();


        $(this).html('<i class="fa-solid fa-bookmark fa-2xl" style="color: #F5A006;"></i>');


        addToBookmarks(excuseText);

        displayBookmarks();
    });


    function addToHistory(excuse) {
        let historyList = $('.historyList');
        let currentDate = getCurrentDate();

        let li = `<li> <div class="historyListLiLeft"> <h2>${excuse}</h2> </div> <div class="historyListLiCenter"><span class="excuseDate">${currentDate}</span> </div>
        <div class="historyListLiLRight"> <div class="bookmarkBtm"><i class="fa-regular fa-bookmark fa-2xl" style="color: #F5A006;"></i> </div> <div class="excuse_delete excuse_action">
        
        <img src="./Imgs/bin top.png" alt="delete top" class="excuse_deleteTop">
        <img src="./Imgs/bin bottom.png" alt="delete bottom" class="deleteExcuse">
    </div>  </div>             
        
        
        </li>`;
        
        historyList.prepend(li);

        if (historyList.children().length > 10) {
            historyList.children().last().remove();
        }

        saveHistoryToLocalStorage();
    }

    
    function saveHistoryToLocalStorage() {
        let historyItems = [];
        $('.historyList li').each(function() {
            historyItems.push($(this).html());
        });

        localStorage.setItem('excuseHistory', JSON.stringify(historyItems));
    }

   
    function getCurrentDate() {
        let now = new Date();
        let year = now.getFullYear().toString().slice(-2); 
        let month = (now.getMonth() + 1).toString().padStart(2, '0'); 
        let day = now.getDate().toString().padStart(2, '0'); 
        let hours = now.getHours().toString().padStart(2, '0'); 
        let minutes = now.getMinutes().toString().padStart(2, '0'); 
        let seconds = now.getSeconds().toString().padStart(2, '0');
        return ` ${day}/${month}/${year} <div class = "time"> ${hours}:${minutes}:${seconds}</div>`;
    }

   
    function loadHistoryFromLocalStorage() {
        let savedHistory = localStorage.getItem('excuseHistory');
        if (savedHistory) {
            let historyList = $('.historyList');
            let historyItems = JSON.parse(savedHistory);
            historyItems.forEach(function(item) {
                historyList.append(`<li>${item}</li>`);
            });

            
            while (historyList.children().length > 10) {
                historyList.children().last().remove();
            }
        }
    }

   
    $('.historyList').on('click', '.deleteExcuse', function() {
        $(this).closest('li').remove(); 
        saveHistoryToLocalStorage();
    });



// the function of adding bookmarks

    function addToBookmarks(excuse) {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.push(excuse);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    function displayBookmarks() {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        let bookmarksList = $('.bookmarks');
    
        bookmarksList.empty(); 
    
        bookmarks.forEach(function(excuse, index) {
            let li = `<li>${excuse} <button class="deleteBookmark" data-index="${index}">Delete</button></li>`;
            bookmarksList.append(li); 
        });

    }

    $('.bookmarks').on('click', '.deleteBookmark', function() {
        let index = $(this).data('index');
        removeBookmark(index);
        displayBookmarks();
    });
    
    function removeBookmark(index) {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        if (index >= 0 && index < bookmarks.length) {
            bookmarks.splice(index, 1);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
    }

    displayBookmarks();

    
});

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
}); 
function changeTheme(theme){
    if(theme == 'light'){
        $('.themeChanger').css('justify-content', 'flex-start')
        $('.wrap').css('background-color', '#fff')
        $('h3').css('color', '#000')
        $('h4').css('color', '#000')
        $('.header_notificationsCircle').css('background-color', '#000')
        $('.header_notificationsCircle').css('box-shadow', '0 0 1px 1px rgba(0, 0, 0, 0.72)')
        $('.menu_logo').attr('src', './Imgs/LogoLight.png')
        $('#homePage').css('background-color', '#fff')
        $('#adminPage').css('color', '#fff')
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
        $('#homePage').css('background-color', '#000')
        $('#adminPage').css('color', '#000')
        $('.personIcon').attr('src', './Imgs/person icon dark.png')
        $('.BoxThemeChanger').css('background-color', '#000')
        $('.themeChanger').css('background-color', '#3B3B3B')
        $('.themeChanger_circle').css('background-color', '#8C8C8C')
        $('.themeChanger_circle').css('border', 'none')
    }
}
changeTheme(theme);

//settings menu
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

//account pages changing
$('#SignIn').click(()=>{
    $('.SignInCon').css('display', 'flex')
    $('.logInCon').css('display', 'none')
    $('#SignIn').css('color', '#F5A006')
    $('#LogIn').css('color', '#000')
})
$('#LogIn').click(()=>{
    $('.logInCon').css('display', 'flex')
    $('.SignInCon').css('display', 'none')
    $('#SignIn').css('color', '#000')
    $('#LogIn').css('color', '#F5A006')
})
$('.createAnAccount').click(()=>{
    $('.SignInCon').css('display', 'flex')
    $('.logInCon').css('display', 'none')
    $('#SignIn').css('color', '#F5A006')
    $('#LogIn').css('color', '#000')
})
$('.alreadyHaveAccount').click(()=>{
    $('.logInCon').css('display', 'flex')
    $('.SignInCon').css('display', 'none')
    $('#SignIn').css('color', '#000')
    $('#LogIn').css('color', '#F5A006')
})

//signing in
$('#signInBtn').click(() => {
    if ($('#Sign_name').val() !== '' && $('#Sign_email').val() !== '' && $('#Sign_password').val() !== '') {
        let data = {
            name: $('#Sign_name').val(),
            email: $('#Sign_email').val(),
            password: $('#Sign_password').val()
        };
        axios.post('http://localhost:3000/create-account', data)
            .then((response) => {
                $('#Sign_name').val('');
                $('#Sign_email').val('');
                $('#Sign_password').val('');
                alert('Account created successfully!');
                location.reload();
            })
            .catch((error) => {
                console.error('Error creating account:', error);
                alert('Failed to create account. Please try again.');
            });
    } else {
        alert('Fill in the inputs');
    }
});

$('#logInBtn').click(() => {
    axios.get('http://localhost:3000/accounts')
    .then((res) => {
        console.log(res.data);
        const email = $('#logIn_email').val();
        const password = $('#logIn_password').val();
        const account = res.data.find(acc => acc.email === email && acc.password === password);

        if (account) {
            Cookies.set('loggedIn', 'true', { expires: 1 });
            Cookies.set('name', account.name, { expires: 1 });
            Cookies.set('email', account.email, { expires: 1 });

            alert('Login successful');
            displayAccountData();
        } else {
            alert('No such account found');
        }
    })
    .catch((err) => {
        console.error('Error fetching accounts:', err);
        alert('Error logging in. Please try again.');
    });
});

function displayAccountData() {
    if (Cookies.get('loggedIn') === 'true') {
        const name = Cookies.get('name');
        const email = Cookies.get('email');
        
        $('.menu_logIn_nickName').text(name);
        $('.menu_logIn_gmail').text(email);
        $('.accountPage').hide();
    } else {
        $('.menu_logIn_nickName').text('');
        $('.menu_logIn_gmail').text('');
        $('.accountPage').show();
    }
}

$(document).ready(() => {
    displayAccountData();
});

//log out function
$('#logOutBtn').click(() => {
    Cookies.remove('loggedIn');
    Cookies.remove('name');
    Cookies.remove('email');
    displayAccountData();
});
