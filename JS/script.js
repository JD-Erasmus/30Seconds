// script.js
$(document).ready(function () {
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
        "Sandwich Harbour", "Desert Elephants", "Desert Lion", "Windhoek Showgrounds", "Okavango Delta",
        "Gondwana Lodges", "Safari", "Katutura", "Namport",
        "Old Mutual", "NAMDEB", "Rundu", "African Time", "Chula Chula", "Mahangu", "Oshiwambo", "Damara Punch",
        "Sacky Shanghala", "Namibian Dollar", "Okavango River", "African Stars", "Mjolo", "Ke December", "Samuel Nujoma", "Pirate Ship", "Chief Hendrik Witbooi",
        "Frankie Fredericks", "Welwitschia", "Amapiano", "Oshiwambo Wedding", "Oviritje Music", "Braai Master", "Rooibos Tea", "Mopane Worms",
        "Dankie Brewery", "Eeh-wa!", "Jou Lekker Ding", "Hosea Kutako", "Harry Simon", "Ninja", "Jacques Burger", "Tswazis", "Eagle FM", "Telecom Namibia",
        "MTC", "Paratus", "Desert Dash", "Yango", "Tap-A-Meal", "InDrive", "Dankie Botswana", "Waterberg Plateau", "Donkey Stew", "LEFA", "Namlish",
        "Brah", "Dumela", "Pavement Special", "Pitbull", "Brewers Market", "Lüderitz", "Walvis Bay", "Swakopmund", "Sossusvlei", "Ombike", "Oshifima", 
        "Camelthorn tree", "Gazza", "Angel Fish", "Collin Benjamin", "Michelle McLean", "Hosea Kutako", "Clemens Kapuuo", "Vogelstrausskluft Lodge", 
        "Langstrand", "Sandfontein Lodge", "Hochland", "Witkop", "Lekkerwater", "Frans Indongo", "Harold Pupkewitz", "Veldskoen", "Donkey Cart",
        // Adding new Namibian content
        "Theo-Ben Gurirab", "Penduka Village", "Daan Viljoen Game Park", "Von Bach Dam", "Gross Barmen",
         "Omatako Mountains", "Brandberg Mountain", "Kunene River", "Zambezi Region",
        "Kavango Region", "Otjozondjupa", "Khomas Region", "Erongo Region", "Hardap Dam",
        "Naute Dam", "Ruacana Falls", "Popa Falls", "Tsumeb Mine", "Rössing Uranium Mine",
        "Husab Mine", "Monica Geingos", "Peter Nanyemba", "Andimba Toivo ya Toivo", "Hendrik Witbooi",
        "Anna Mungunda", "Brendan Simbwaye", "Putuse Appolus", "Libertina Amathila", "Ben Amadhila",
        "Oshana Region", "Ohangwena Region", "Omusati Region", "Oshikoto Region", "Omaheke Region",
        "//Kharas Region", "Otavi", "Outjo", "Opuwo", "Katima Mulilo",
        "Keetmanshoop", "Mariental", "Rehoboth", "Henties Bay", "Oranjemund",
        "Tsumkwe", "Grootfontein", "Otjiwarongo", "Okakarara", "Gobabis",
        "Namib Mills", "Namibia Breweries", "Namibia Dairies", "Ohlthaver & List", "Pupkewitz Group",
        "Capricorn Group", "Nictus", "Trustco", "Namibia Wildlife Resorts", "AgriBank",
        "Development Bank of Namibia", "NamWater", "NamPower", "Namibia Statistics Agency", "Bank of Namibia",
        "Namibia University of Science and Technology", "International University of Management", "Namibia Institute of Mining and Technology",
        "Windhoek Country Club", "Safari Hotel", "Hilton Windhoek", "Avani Windhoek", "Joe's Beerhouse",
        "Namibia Football Association", "Cricket Namibia", "Rugby Union of Namibia", "Namibia Olympic Committee"
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

    $('#ends').on('click', function () {
        $('#exampleModalCenter').modal('hide');
        $('#timerDisplay').text('');
        $('#generateCardsBtn').show();
    });

    $('#restart').on('click', function () {
        $('#exampleModalCenter').modal('hide');
        generateNewCard();
        console.log("restart button clicked!");
        // var timeUpSoundtestsss = new Audio('./assets/Sound-Effect.mp3');
        // timeUpSoundtestsss.load(); 
        // Delay the sound for 30 seconds (30,000 milliseconds)
      
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

// // Declare the audio elements globally
// var timeUpSoundtest = new Audio('./assets/Sound-Effect.mp3');
// timeUpSoundtest.preload = "auto"; // Preload the audio file

// var gameStartSounds = new Audio('./assets/gamestarts.mp3');
// gameStartSounds.preload = "auto"; // Preload the audio file

// // Function to play sounds
// async function playSounds() {
//     // Play the first sound immediately
//     gameStartSounds.volume = 1.0; // Set volume (0.0 to 1.0)
//     gameStartSounds.currentTime = 0; // Reset playback position
//     try {
//         await gameStartSounds.play();
//         console.log("First sound played!");
//     } catch (error) {
//         console.warn("First audio playback failed:", error);
//     }


//     // Play the second sound after 30 seconds
//     setTimeout(async () => {
 
//         // Clear the current sound
//         gameStartSounds = null; // Remove the reference to the old audio object

//         // Load a new sound
//         gameStartSounds = new Audio('./assets/Sound-Effect.mp3');
//         gameStartSounds.preload = "auto"; // Preload the new audio file
//         console.log("New sound loaded:");


//         // timeUpSoundtest.volume = 1.0; // Set volume (0.0 to 1.0)
//         // timeUpSoundtest.currentTime = 0; // Reset playback position
//         try {
//             await gameStartSounds.play();
//             console.log("Second sound played after 30 seconds!");
//         } catch (error) {
//             console.warn("Second audio playback failed:", error);
//         }
//     }, 30000); // Delay of 30 seconds
// }

// // jQuery: When the start button is clicked
// $(document).ready(function () {
//     $('.startButton').on('click', function () {
//         console.log("Start button clicked!");
//         playSounds(); // Call the function to play both sounds

//     });
// });

// Load Howler.js from a CDN
 
  // Create a Howl object for the first sound
  const sound1 = new Howl({
    src: ['./assets/gamestarts.mp3'],
    preload: true,
  });

  // Create a Howl object for the second sound
  const sound2 = new Howl({
    src: ['./assets/Sound-Effect.mp3'],
    preload: true,
  });

  // Function to play sounds with a delay
  function playSounds() {
    sound1.play(); // Play the first sound immediately

    // Play the second sound after 30 seconds
    setTimeout(() => {
      sound2.play();
    }, 30000);
  }
 
  // Trigger the function on button click
  document.querySelector('.startButton').addEventListener('click', playSounds);

// Trigger the function on button click
document.querySelector('.restart').addEventListener('click', playSounds);
 