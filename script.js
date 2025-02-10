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
    var timeUpSound = new Audio('./assets/Sound-Effect.mp3');
    timeUpSound.load(); 
    
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

                // timeUpSound.preload = 'auto'; // Preloads the audio file

                // timeUpSound.play();
                $('#timerDisplay').text("Time's up!");
                // // Execute all end-game actions simultaneously
                // Promise.all([
                //     playTimeUpSound(),
                //     // timeUpSound.play(),
                //     $('#timerDisplay').text("Time's up!"),
                //     // this flips the card right after the user played, but i think its best to keep incase they want to show the options they had before the game ended 
                //     // $('.card').removeClass('flipped')

                //     // $('.card').addClass('flipped')
                // ]).catch(error => {
                //     console.error("Error during end game:", error);
                // });
                
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
        console.log("restart button clicked!");
        // var timeUpSoundtestsss = new Audio('./assets/Sound-Effect.mp3');
        // timeUpSoundtestsss.load(); 
        // Delay the sound for 30 seconds (30,000 milliseconds)
        setTimeout(function() {
            console.log("Playing sound after 30 seconds!");
            // timeUpSoundtestsss.play();  // Play the sound
            playTimddeUpSound();
        }, 30000);
    });

    // Log browser info on load
    console.log(`You are using: ${detectBrowser()}`);
});




// $(document).ready(function(){
//     const audio = document.getElementsByClassName('audio');
//     const startButton = document.getElementsByClassName('startButton');
    
//     startButton.addEventListener('click', () => {
//         console.log("the button was clicked ")
//       // Play and immediately pause a silent audio file to unlock audio
//       audio.play().then(() => {
//         audio.pause();
//         audio.currentTime = 0;
    
//         // Start your game logic here
//         // setTimeout(() => {
//         //   audio.play(); // Play the sound after 30 seconds
//         // }, 30000);
//       });
//     });
    

// });
 // Global function to play the sound with error handling
window.playTimddeUpSound = () => {
    var timeUpSoundss = new Audio('./assets/Sound-Effect.mp3');
    timeUpSoundss.load(); 
    return timeUpSoundss.play().catch(error => {
        console.warn("Audio playback failed, retrying...", error);
        return Promise.resolve(); // Prevent Promise.all from breaking
    });
};
// ... existing code ...
// $(document).ready(function() {
//     // Create audio element


//     $('.startButton').on('click', function() {
//         var timeUpSoundtest = new Audio('./assets/Sound-Effect.mp3');
//         timeUpSoundtest.preload  = "auto";
//         timeUpSoundtest.volume = 0.0;
//         timeUpSoundtest.play();
//         console.log("Start button clicked!");
//         // playTimddeUpSound()
//         // Delay the sound for 30 seconds (30,000 milliseconds)
//         setTimeout(function() {
//             timeUpSoundtest.volume = 1.0;
//             console.log("Playing sound after 30 seconds!");
//             timeUpSoundtest.play();  // Play the sound
//             // playTimddeUpSound();
//         }, 30000);
//     });
// });

// Declare the audio element globally
var timeUpSoundtest = new Audio('./assets/Sound-Effect.mp3');
timeUpSoundtest.preload = "auto"; // Preload the audio file

// Function to play the sound at a specific volume
async function playTimeUpSound(volume) {
    timeUpSoundtest.volume = volume;  // Set volume (0.0 to 1.0)
    timeUpSoundtest.currentTime = 0;  // Reset playback position
    try {
        await timeUpSoundtest.play();
    } catch (error) {
        console.warn("Audio playback failed:", error);
    }
}

// jQuery: When the start button is clicked
$(document).ready(function() {
    $('.startButton').on('click', function() {
        console.log("Start button clicked!");

        // Play the sound at low volume (e.g., 0.3)
        playTimeUpSound(0.0);

        // After 30 seconds, increase the volume and play again
        setTimeout(() => {
            console.log("Playing sound at full volume after 30 seconds!");
            playTimeUpSound(1.0);
        }, 30000); // Delay of 30 seconds
    });
});
