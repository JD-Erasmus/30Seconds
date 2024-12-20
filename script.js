// script.js
const words = [
    "Fishrot", "Windhoek Lager", "Tafel Lager", "Kapana", "Fat Cakes", "Ohole",
    "The Dogg", "King TeeDee", "Sam Nujoma", "Namib Desert", "Etosha",
    "Fish River Canyon", "Skeleton Coast", "Spitzkoppe", "Quiver Tree", "Oshakati",
    "Herero Dress", "Himba Women", "Bushmen", "NAMAs", "Ricardo Mannetti",
    "Brave Warriors", "Independence Day", "March 21", "Mealie Pap", "Matangara", "Donkey Festival",
    "Oshikundu", "Biltong", "Droëwors", "Meatco", "Bank Windhoek",
    "German Colonial Rule", "Caprivi Strip", "UNAM", "NUST", "Okahandja", "Swapo", "Nxa", "Sharp", "Aweh",
    "Gobabis", "Namib Wild Horses", "Oryx", "Springbok", "Dune 45", "Taxi",
    "Deadvlei", "Epupa Falls", "Kolmanskop", "Otjikoto Lake", "Hoba Meteorite",
    "Sam Shivute", "Air Namibia", "Ongwediva Trade Fair", "Hage Geingob", "Land of the Brave",
    "NBC", "Namibian Sun", "Road Fund Administration", "TransNamib", "Sunburn",
    "Sandwich Harbour", "Desert Adapted Elephants", "Windhoek Showgrounds", "Okavango Delta",
    "Gondwana Lodges", "Safari", "NamibRand Nature Reserve", "Katutura", "Namport",
    "Old Mutual", "NAMDEB", "Rundu", "Warm Land", "African Time", "Chula Chula", "Mahangu", "Oshiwambo", "Damara Punch",
    "Friendly People", "Fat Cakes Vendor", "Sacky Shanghala", "Namibian Dollar", "Okavango River", "African Stars", "Mjolo", "Ke December", "Samuel Nujoma", "Swakop"
];

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Function to get shuffled cards grouped into 5
let usedWords = new Set();

function getNamibianCards() {
    try {
        const availableWords = words.filter(word => !usedWords.has(word));
        
        // Reset used words if running low
        if (availableWords.length < 5) {
            usedWords.clear();
        }
        
        const shuffledWords = [...availableWords];
        shuffle(shuffledWords);
        
        // Take first 5 words and add to used set
        const selectedWords = shuffledWords.slice(0, 5);
        selectedWords.forEach(word => usedWords.add(word));
        
        return [selectedWords]; // Return as single card array
    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
}

let timerInterval;
const card = document.querySelector('.card');

let isPlaying = false;

function flipCard() {
    if (!isPlaying || !document.getElementById("timerDisplay").textContent) {
        card.classList.toggle('flipped');
    }
}

document.getElementById("ends").addEventListener("click", function() {
    $('#exampleModalCenter').modal('hide');
    // Reset timer display
    // document.getElementById("timerDisplay").textContent = "";
    // card.classList.remove('flipped');
});

document.getElementById("restart").addEventListener("click", function() {
    $('#exampleModalCenter').modal('hide');
    generateNewCard();
});

function startTimer(durationInSeconds) {
    const timerDisplay = document.getElementById("timerDisplay");
    let remainingTime = durationInSeconds;
    
    // Clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerDisplay.textContent = remainingTime;
    
    timerInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
            clearInterval(timerInterval);

            timerDisplay.textContent = "Time's up!";
            card.classList.add('flipped'); // Ensure card stays flipped
            setTimeout(() => {
                $('#exampleModalCenter').modal('show');
            }, 500);
        } else {
            timerDisplay.textContent = remainingTime;
        }
    }, 1000);
}

function generateNewCard() {
    isPlaying = true;
    const wordList = document.getElementById("wordList");
    wordList.innerHTML = "";

    const cards = getNamibianCards();
    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    randomCard.forEach(word => {
        const listItem = document.createElement("li");
        listItem.className = "word-item";
        listItem.textContent = word;
        wordList.appendChild(listItem);
    });

    card.classList.remove('flipped');

    setTimeout(() => {
        card.classList.add('flipped');
        startTimer(30);
    }, 500);
}

document.getElementById("generateCardsBtn").addEventListener("click", generateNewCard);
// card.addEventListener('click', flipCard);
// i wanna see the brpwer the user is using 
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browserName;

    if (userAgent.includes("Firefox")) {
        browserName = "Mozilla Firefox";
    } else if (userAgent.includes("Edg")) {
        browserName = "Microsoft Edge";
    } else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
        browserName = "Google Chrome";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        browserName = "Safari";
        $('#browser').modal('show');
    } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
        browserName = "Internet Explorer";
    } else {
        browserName = "Unknown browser";
    }

    return browserName;
}

console.log(`You are using: ${detectBrowser()}`);
