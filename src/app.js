import GameBoard from './gameBoard.js';
import ScoreBoard from './scoreBoard.js';
import Timer from './timer.js';

const EASY_MODE = {
    row: 2,
    col: 2,
    correction: 2,
    timeLimit: 10
}

const HARD_MODE = {
    row: 4,
    col: 4,
    correction: 8,
    timeLimit: 90
}

const EXTREME_MODE = {
    row: 8,
    col: 8,
    correction: 32,
    timeLimit: 120
}

const body = document.getElementById('app');
const form = document.createElement('form');
form.style.width = '200px';
form.style.height = '50px';
const easyBtn = document.createElement('input'); 
easyBtn.type = 'radio';
easyBtn.name = 'level-selector';
easyBtn.textContent = 'EASY MODE';
easyBtn.value = '1';
const hardBtn = document.createElement('input'); 
hardBtn.type = 'radio';
hardBtn.name = 'level-selector';
hardBtn.value = '2';
const extreamBtn = document.createElement('input'); 
extreamBtn.type = 'radio';
extreamBtn.name = 'level-selector';
extreamBtn.value = '3';

const levelSelector = [easyBtn, hardBtn, extreamBtn];
let selected = undefined;

levelSelector.forEach((btn) => {
    btn.addEventListener('change', () => {
        if (selected === btn) return;

        if (btn.value === '1') {
            gameBoard.initialize(EASY_MODE);
        } else if (btn.value === '2') {
            gameBoard.initialize(HARD_MODE);
        } else {
            gameBoard.initialize(EXTREME_MODE);
        }
    });

    form.appendChild(btn);
});

body.appendChild(form);

const scoreBoard = new ScoreBoard(body);
const timer = new Timer(body);
const gameBoard = new GameBoard(body, scoreBoard, timer);
