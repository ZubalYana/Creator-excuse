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
        </div> </div> </li>`;
    
        historyList.prepend(li); 
    
        if (historyList.children().length > 10) {
            historyList.children().last().remove();
        }
    
        saveHistoryToLocalStorage();
    }
    
    
function saveHistoryToLocalStorage() {
    let historyItems = [];
    $('.historyList li').each(function() {
        let excuse = $(this).find('.historyListLiLeft h2').text();
        let date = $(this).find('.excuseDate').text();
        historyItems.push({ excuse: excuse, date: date });
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
            historyList.empty(); // Clear existing historyList before appending
    
            historyItems.forEach(function(item) {
                let li = `<li><div class="historyListLiLeft"><h2>${item.excuse}</h2></div><div class="historyListLiCenter"><span class="excuseDate">${item.date}</span></div><div class="historyListLiLRight"><div class="bookmarkBtm"><i class="fa-regular fa-bookmark fa-2xl" style="color: #F5A006;"></i></div><div class="excuse_delete excuse_action"><img src="./Imgs/bin top.png" alt="delete top" class="excuse_deleteTop"><img src="./Imgs/bin bottom.png" alt="delete bottom" class="deleteExcuse"></div></div></li>`;
                historyList.append(li);
            });
    
            // Remove excess history items if more than 10
            while (historyList.children().length > 10) {
                historyList.children().first().remove();
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
            let li = `<li>${excuse}<i class="fa-solid fa-trash-can deleteBookmark"  data-index="${index}"></i></li>`;
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



$(document).ready(async function () {
    try {
        const response = await axios.get('/api/user');
        console.log(response.data)
        $('.menu_logIn_nickName').text(response.data.username);
        $('.menu_logIn_gmail').text(response.data.email);

        Cookies.remove('loggedIn');
        Cookies.remove('name');
        Cookies.remove('email');
    } catch (error) {
        window.location.href = '/auth';
    }
    $('#logOutBtn').click(async function () {
        try {
            await axios.post('/auth/logout');
            window.location.href = '/auth';
        } catch (error) {
            alert('Failed to logout');
        }
    });
})

//password hiding and displaying
$('.showPassword').click(function() {
    let passwordInput = $('#logIn_password');
    let icon = $(this);

    if (passwordInput.attr('type') === 'password') {
        passwordInput.attr('type', 'text');
        icon.removeClass('fa-eye-slash').addClass('fa-eye');
    } else {
        passwordInput.attr('type', 'password');
        icon.removeClass('fa-eye').addClass('fa-eye-slash');
    }
});

//telegram bot navigation
$('.evaluate').click(function() {
    window.open('https://t.me/CreatorExcuseBot', '_blank');
});

$('.saveMenu').click(()=>{
    $('.bookmarkList').css('display', 'flex')
})
$('.closeBookmarkList').click(()=>{
    $('.bookmarkList').css('display', 'none')
})
$('.saveMenu').click(()=>{
    $('.bookmarkListBox').css('display', 'flex')
})
$('.closeBookmarkList').click(()=>{
    $('.bookmarkListBox').css('display', 'none')
})

//translator from google
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'ua', 
        autoDisplay: false
    }, 'google_translate_element');
}
function loadGoogleTranslateAPI() {
    var script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
}
document.getElementById('language_select').addEventListener('change', function() {
    var selectedLanguage = this.value;
    changeWebsiteLanguage(selectedLanguage);
});
window.onload = function() {
    loadGoogleTranslateAPI();
    var savedLanguage = getSelectedLanguage();
    document.getElementById('language_select').value = savedLanguage;
    changeWebsiteLanguage(savedLanguage);
};
