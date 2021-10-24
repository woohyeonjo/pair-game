export default class ScoreBoard {
    constructor(target) {
        this.currentScore = 0;

        this.scoreBoard = document.createElement('div');
        this.scoreBoard.className = 'score-board';
        this.scoreBoard.style.width = '200px';
        this.scoreBoard.style.height = '50px';
        this.scoreBoard.style.border = '1px solid black';
        this.scoreBoard.style.textAlign = 'center';
        this.scoreBoard.style.fontSize = '40px';

        target.appendChild(this.scoreBoard);
        
        this.render();
    }

    initialize() {
        this.currentScore = 0;
        this.render();
    }

    render() {
        this.scoreBoard.textContent = `${this.currentScore} 점`;
    }

    correct() {
        this.currentScore += 5;
        this.render();
    }

    wrong() {
        this.currentScore -= 3;
        this.render();
    }

    getScore() {
        return this.currentScore;
    }

    addTimeScore(remainingTime) {
        this.currentScore += (remainingTime * 5);
        this.render();
    }
}
