const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const setupBtn = document.getElementById('setupBtn');
const numInput = document.getElementById('numInput');

let score = 0;
let nextTarget = 1; 

function updateScore() {
  scoreBoard.textContent = `Score: ${score}`;
}

setupBtn.addEventListener('click', () => {
  const targetCount = parseInt(numInput.value);
  if (!targetCount || targetCount < 1) {
    alert("Please enter a valid number of targets.");
    return;
  }
  setupTargets(targetCount);
});

function setupTargets(count) {
  gameArea.innerHTML = '';
  score = 0;
  nextTarget = 1;  
  scoreBoard.textContent = `Score: ${score}`;

  const gameAreaRect = gameArea.getBoundingClientRect();
  const size = 50;

  for (let i = 1; i <= count; i++) {
    const target = document.createElement('div');
    target.classList.add('target');
    target.textContent = i;

    moveTargetToRandomPosition(target, gameAreaRect, size);

  
    target.addEventListener('click', () => {
      if (parseInt(target.textContent) === nextTarget) {
        score++;  
        nextTarget++; 
        updateScore();  
        moveTargetToRandomPosition(target, gameAreaRect, size);  
      }
    });

    target.addEventListener('contextmenu', function(event) {
      event.preventDefault();
     
      if (parseInt(target.textContent) === nextTarget) {
        target.remove();
        score++;
        nextTarget++;
        updateScore();
      }
    });

    gameArea.appendChild(target);
  }
}

function moveTargetToRandomPosition(target, containerRect, size) {
  const maxX = containerRect.width - size;
  const maxY = containerRect.height - size;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'F1') {
    score = 0;
    updateScore();
    event.preventDefault();
  }
});
