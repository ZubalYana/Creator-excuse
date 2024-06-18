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
        })
        .catch((error) => {
            console.error('Error fetching excuses:', error);
        });
    });

    function addToHistory(excuse) {
        let historyList = $('.historyList');
        let currentDate = getCurrentDate();

        let li = `<li> <div class="historyListLiLeft"> <h2>${excuse}</h2> </div> <div class="historyListLiCenter"><span class="excuseDate">${currentDate}</span> </div>
        <div class="historyListLiLRight">  <button class="removeExcuse">Remove</button></div></li>`;
        
        historyList.prepend(li);

        if (historyList.children().length > 4) {
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
        return `${day}.${month}.${year}`;
    }

   
    function loadHistoryFromLocalStorage() {
        let savedHistory = localStorage.getItem('excuseHistory');
        if (savedHistory) {
            let historyList = $('.historyList');
            let historyItems = JSON.parse(savedHistory);
            historyItems.forEach(function(item) {
                historyList.append(`<li>${item}</li>`);
            });

            
            while (historyList.children().length > 4) {
                historyList.children().last().remove();
            }
        }
    }

   
    $('.historyList').on('click', '.removeExcuse', function() {
        $(this).closest('li').remove(); 
        saveHistoryToLocalStorage();
    });
});
