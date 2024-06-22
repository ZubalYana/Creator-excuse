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
    function addToHistory(excuse) {
        let historyList = $('.historyList');
        let currentDate = getCurrentDate();

        let li = `<li> <div class="historyListLiLeft"> <h2>${excuse}</h2> </div> <div class="historyListLiCenter"><span class="excuseDate">${currentDate}</span> </div>
        <div class="historyListLiLRight"> <div class="excuse_delete excuse_action">
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

// settings menu
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
