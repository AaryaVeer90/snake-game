let gameContainer = document.querySelector(".game-container");
let scoreContainer = document.querySelector(".score-container");
// Select the game container and score container from the HTML document
let foodX, foodY;
let headX = 12, headY = 12;// Initial position of the snake's head

let velocityX = 0, velocityY = 0; // Initial velocity of the snake
let snakebody = []; // Array to hold the snake's body segments
let score = 0; // Initialize score variable
let intervalId; // Store interval ID
let currentInterval = 150; // Current interval speed

function generatefood(){
foodX = Math.floor(Math.random() * 25)+1 ;//floor to trim decimal part, random function gies number from 0 to 0.999 , but nort 1
foodY = Math.floor(Math.random() * 25)+1 ;//so we multiply it by 25 to get number from 0 to 24


}






function renderGame(){
    let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;
    if(headX == foodX && headY == foodY){
        snakebody.push([foodX, foodY]);// Add a new segment to the snake   
        generatefood(); 
        score=score+10; // Increase score by 10
        document.querySelector(".score-container").innerText = `SCORE: ${score}`;
        //return; // Exit the function to prevent further rendering

        // Increase speed if score > 50 and not already increased
        if (score > 20 && currentInterval === 150) {
            clearInterval(intervalId);
            currentInterval = 100; // 150 - 50 = 100ms
            intervalId = setInterval(renderGame, currentInterval);
        }
    }
    




        snakebody.pop();// Remove the last segment of the snake's body to simulate movement
    headX += velocityX;
    headY += velocityY;
    snakebody.unshift([headX, headY]); // Add the new head position to the front of the snake body
    if(headX== 0 || headX > 25 || headY == 0 || headY > 25){
        score = 0; // Reset score
        document.querySelector(".score-container").innerText = `SCORE: ${score}`;
        alert("Game Over! You hit the wall.");
         
        headX = 12; // Reset head position
        headY = 12;
        velocityX = 0; // Reset velocity
        velocityY = 0;
        generatefood(); // Regenerate food
        // Reset speed on game over
        if (currentInterval !== 150) {
            clearInterval(intervalId);
            currentInterval = 150;
            intervalId = setInterval(renderGame, currentInterval);
        }
        return; // Exit the function to prevent further rendering
    }
    
    for(let i = 1; i < snakebody.length; i++){
        if(snakebody[0][0] == snakebody[i][0] && snakebody[0][1] == snakebody[i][1]){
            snakebody = []; // Clear the snake body
            
            score = 0; // Reset score
            document.querySelector(".score-container").innerText = `SCORE: ${score}`;
            alert("Game Over! You hit yourself.");
            
            headX = 12; // Reset head position
            headY = 12;
            velocityX = 0; // Reset velocity
            velocityY = 0;
            generatefood(); // Regenerate food
            // Reset speed on game over
            if (currentInterval !== 150) {
                clearInterval(intervalId);
                currentInterval = 150;
                intervalId = setInterval(renderGame, currentInterval);
            }
            return; // Exit the function to prevent further rendering
        }



    }
    for(let i = 0; i < snakebody.length; i++){

        updatedGame += `<div class="snake" style="grid-area: ${snakebody[i][1]}/${snakebody[i][0]};"></div>`;
    }
        
    


    gameContainer.innerHTML = updatedGame;
}

generatefood();
intervalId = setInterval(renderGame, currentInterval); // Use intervalId




document.addEventListener("keydown", function(e) {
    console.log(e.key);
    let key = e.key;
    if (key === "ArrowUp" && (velocityY !== 1)) {
        velocityX = 0;
        velocityY = -1;
    } else if (key === "ArrowDown" && (velocityY !== -1)) {
        velocityX = 0;
        velocityY = 1;
    } else if (key === "ArrowLeft" && (velocityX !== 1)) {
        velocityX = -1;
        velocityY = 0;
    } else if (key === "ArrowRight" && (velocityX !== -1)) {
        velocityX = 1;
        velocityY = 0;
    }
})