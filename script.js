// script.js
$(document).ready(function() {
    const words = [
        "Fishrot", "Windhoek Lager", "Tafel Lager", "Kapana", "Fat Cakes", "Ohole",
         "King TeeDee", "Namib Desert", "Etosha National Park",
        "Fish River Canyon", "Skeleton Coast", "Spitzkoppe", "Quiver Tree", "Oshakati",
        "Herero Dress", "Himba Women", "Bushmen", "NAMAs", "Ricardo Mannetti",
        "Brave Warriors", "Independence Day", "March 21", "Mealie Pap", "Matangara", "Donkey Festival",
        "Oshikundu", "Biltong", "Droëwors", "Meatco", "Bank Windhoek", "FNB", "Standard Bank",
        "German Colonial Rule", "Caprivi Strip", "UNAM", "NUST", "Okahandja", "Swapo", "Nxa", "Sharp", "Aweh",
        "Gobabis", "Namib Wild Horses", "Oryx", "Springbok", "Dune 45", "Taxi",
        "Deadvlei", "Epupa Falls", "Kolmanskop", "Otjikoto Lake", "Hoba Meteorite",
        "Sam Shivute", "Air Namibia", "Ongwediva Trade Fair", "Hage Geingob", "Land of the Brave",
        "NBC", "Namibian Sun", "Road Fund Administration", "TransNamib", "Sunburn",
        "Sandwich Harbour", "Desert Elephants","Desert Lion", "Windhoek Showgrounds", "Okavango Delta",
        "Gondwana Lodges", "Safari",  "Katutura", "Namport",
        "Old Mutual", "NAMDEB", "Rundu", "African Time", "Chula Chula", "Mahangu", "Oshiwambo", "Damara Punch",
        "Sacky Shanghala", "Namibian Dollar", "Okavango River", "African Stars", "Mjolo", "Ke December", "Samuel Nujoma", "Pirate Ship", "Chief Hendrik Witbooi",
        "Frankie Fredericks", "Welwitschia", "Amapiano", "Oshiwambo Wedding","Oviritje Music", "Braai Master", "Rooibos Tea", "Mopane Worms",
        "Dankie Brewery", "Eeh-wa!", "Jou Lekker Ding", "Hosea Kutako", "Harry Simon", "Ninja", "Jacques Burger", "Tswazis", "Eagle FM", "Telecom Namibia",
        "MTC", "Paratus", "Desert Dash", "Yango", "Tap-A-Meal", "InDrive", "Dankie Botswana" , "Waterberg Plateau", "Donkey Stew" , "LEFA", "Namlish",
        "Brah", "Dumela", "Pavement Special", "Pitbull", "Brewers Market","Lüderitz"
        , "Walvis Bay","Swakopmund","Sossusvlei","Ombike", "Oshifima" ,"Camelthorn tree", "Gazza", "Angel Fish","Collin Benjamin",
        "Michelle McLean","Hosea Kutako","Clemens Kapuuo","Vogelstrausskluft Lodge","Langstrand","Sandfontein Lodge","Hochland","Witkop","Lekkerwater"


    ];
    

    let usedWords = new Set();
    let timerInterval;
    const timeUpSound = new Audio('./assets/Sound-Effect.mp3');
    // timeUpSound.load(); 
    
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function getNamibianCards() {
        try {
            const availableWords = words.filter(word => !usedWords.has(word));
            
            if (availableWords.length < 5) {
                usedWords.clear();
            }
            
            const shuffledWords = [...availableWords];
            shuffle(shuffledWords);
            
            const selectedWords = shuffledWords.slice(0, 5);
            selectedWords.forEach(word => usedWords.add(word));
            
            return [selectedWords];
        } catch (error) {
            console.error("An error occurred:", error);
            return [];
        }
    }

    function startTimer(durationInSeconds) {
        $('#generateCardsBtn').hide();
        
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        let remainingTime = durationInSeconds;
        $('#timerDisplay').text(remainingTime);
        
        timerInterval = setInterval(() => {
            remainingTime--;
            if (remainingTime <= 0) {
                clearInterval(timerInterval);

                timeUpSound.preload = 'auto'; // Preloads the audio file

                
                // Execute all end-game actions simultaneously
                Promise.all([
                    timeUpSound.play(),
                    $('#timerDisplay').text("Time's up!"),
                    // this flips the card right after the user played, but i think its best to keep incase they want to show the options they had before the game ended 
                    // $('.card').removeClass('flipped')

                    // $('.card').addClass('flipped')
                ]).catch(error => {
                    console.error("Error during end game:", error);
                });
                
                // Show modal after a short delay
                setTimeout(() => {
                    $('#exampleModalCenter').modal('show');
                }, 300); // Reduced delay for better responsiveness
            } else {
                $('#timerDisplay').text(remainingTime);
            }
        }, 1000);
    }

    function generateNewCard() {
        isPlaying = true;
        $('#wordList').empty();

        const cards = getNamibianCards();
        const randomCard = cards[Math.floor(Math.random() * cards.length)];

        randomCard.forEach(word => {
            $('<li>')
                .addClass('word-item')
                .text(word)
                .appendTo('#wordList');
        });

        $('.card').removeClass('flipped');

        setTimeout(() => {
            $('.card').addClass('flipped');
            startTimer(30);
        }, 500);
    }

    function detectBrowser() {
        const userAgent = navigator.userAgent.toLowerCase();
        let browserName;

      if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
            browserName = "Safari";
            $('#browser').modal('show');
        } 
        else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
            browserName = "Internet Explorer";
            $('#browser').modal('show');
        } 
        else if (userAgent.includes("edg/")) {
            browserName = "Microsoft Edge";
        }
        else {
            browserName = "Unknown browser";
        }

        return browserName;
    }

    // Event Handlers
    $('#generateCardsBtn').on('click', generateNewCard);

    $('#ends').on('click', function() {
        $('#exampleModalCenter').modal('hide');
        $('#timerDisplay').text('');
        $('#generateCardsBtn').show();
    });

    $('#restart').on('click', function() {
        $('#exampleModalCenter').modal('hide');
        generateNewCard();
    });

    // Log browser info on load
    console.log(`You are using: ${detectBrowser()}`);
});