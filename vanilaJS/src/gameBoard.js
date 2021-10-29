export default class GameBoard {
    constructor(target, scoreBoard, timer) {
        this.gameMode = undefined;
        this.initializedSelector = {
            index: undefined,
            value: undefined,
            node: undefined,
        }
        this.prevSelector = { ...this.initializedSelector };
        this.scoreBoard = scoreBoard;
        this.timer = timer;

        this.correction = 0;

        this.gameBoard = document.createElement('div');
        target.appendChild(this.gameBoard);
    }

    initialize(gameMode) {
        this.gameMode = gameMode;
        this.correction = 0;
        this.prevSelector = { ...this.initializedSelector };
        this.scoreBoard.initialize();
        this.timer.initialize(this.gameMode);
        
        this.render();
        this.timer.start();
    }

    getRandomNumbers() {
        const row = this.gameMode.row;
        const col = this.gameMode.col;
        const MAX_TABLE_SIZE = row * col;
        const MAX_NUMBERS = Math.floor(MAX_TABLE_SIZE / 2);
        const pairStateCount = Array(MAX_NUMBERS).fill(2);

        const numbers = Array(MAX_TABLE_SIZE).fill(0).map(() => {
            let pickedNumber = -1;
    
            while(true) {
                pickedNumber = Math.floor(Math.random() * MAX_NUMBERS);
                if (pairStateCount[pickedNumber] > 0) {
                    pairStateCount[pickedNumber] -= 1;
                    break;
                } 
            }
    
            return pickedNumber;
        });

        return numbers;
    }

    makeCards(numbers) {
        const cards = [];

        numbers.forEach((value, index)=> {
            if (index % this.gameMode.col === 0) {
                const node = document.createElement('div');
                node.style.display = 'block';
                cards.push(node);
            }
    
            const parentNode = cards[cards.length - 1];
            const currentNode = document.createElement('div');
            currentNode.style.display = 'inline-block';
            currentNode.style.width = "100px";
            currentNode.style.height = "100px";
            currentNode.style.border = "1px solid black";
            currentNode.style.textAlign = "center";
            currentNode.style.color = 'white';
            currentNode.textContent = value;
    
            currentNode.onclick = () => {
                const { index: prevIndex, value: prevValue, node: prevNode } = this.prevSelector;
                
                if (prevIndex === undefined) {
                    currentNode.style.backgroundColor = 'green';
                    currentNode.style.color = 'black';
                    this.prevSelector.index = index;
                    this.prevSelector.value = value;
                    this.prevSelector.node = currentNode;
                    return;
                }
    
                if (index === prevIndex) {
                    currentNode.style.backgroundColor = 'white';
                    currentNode.style.color = 'white';
                    this.prevSelector = { ...this.initializedSelector };
                    return;
                }
    
                if (value === prevValue) {
                    currentNode.style.backgroundColor = 'gray';
                    currentNode.style.color = 'black';
                    currentNode.style.pointerEvents = 'none';
                    prevNode.style.backgroundColor = 'gray';
                    prevNode.style.color = 'black';
                    prevNode.style.pointerEvents = 'none';
                    this.prevSelector = { ...this.initializedSelector };
                    this.scoreBoard.correct();
                    this.correction += 1;

                    if (this.correction === this.gameMode.correction) {
                        this.timer.stop();
                        this.scoreBoard.addTimeScore(this.timer.getRemainingTime());
                        setTimeout(() => {
                            alert(`WIN!!! SCORE: ${this.scoreBoard.getScore()}`);
                        }, 0);
                    }
                    return;
                }
    
                prevNode.style.backgroundColor = 'white';
                prevNode.style.color = 'white';
                this.prevSelector = { ...this.initializedSelector };
                this.scoreBoard.wrong();
            };
    
            parentNode.appendChild(currentNode);
        });

        return cards; 
    }

    render() {
        const numbers = this.getRandomNumbers();
        const cards = this.makeCards(numbers);

        this.gameBoard.innerHTML = '';

        cards.forEach((value) => { this.gameBoard.appendChild(value); });
    }
}