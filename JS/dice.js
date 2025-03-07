 
document.addEventListener('DOMContentLoaded', function() {
    const dice = document.getElementById('dice');
    const rollButton = document.getElementById('rollDice');
    const faces = dice.getElementsByClassName('dice-face');
   
    // Create dice rolling sound with loop enabled
    const diceSound = new Howl({
        src: ['./assets/dice-sound.mp3'],
        volume: 0.5,
        rate: 1.0,
        loop: true,
        html5: true
    });

    // Array to store the possible numbers with equal distribution
    const numbers = [0, 1, 2, 3];

    function rollDice() {
        dice.classList.add('rolling');
        rollButton.disabled = true;
        
        // Start the rolling sound with loop
        const soundId = diceSound.play();
        
        setTimeout(() => {
            // Get random number from 0-3
            const result = numbers[Math.floor(Math.random() * numbers.length)];
            
            // Update all faces to show the result
            Array.from(faces).forEach(face => {
                face.textContent = result;
            });
            
            // Stop the sound first (for clean transition)
            diceSound.fade(0.5, 0, 200, soundId);
            setTimeout(() => {
                diceSound.stop(soundId);
            }, 200);
            
            // Complete the animation
            dice.classList.remove('rolling');
            rollButton.disabled = false;
        }, 1500);
    }

    rollButton.addEventListener('click', rollDice);
    dice.addEventListener('click', rollDice);
});
 