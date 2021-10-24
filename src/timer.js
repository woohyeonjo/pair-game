export default class Timer {
    constructor(target) {
        this.initializedTime = 0;
        this.currentTime = 0;
        this.timer = undefined;

        this.timerNode = document.createElement('div');
        this.timerNode.className = 'timerNode';
        this.timerNode.style.width = '200px';
        this.timerNode.style.height = '50px';
        this.timerNode.style.border = '1px solid black';
        this.timerNode.style.textAlign = 'center';
        this.timerNode.style.fontSize = '40px';
    
        target.appendChild(this.timerNode);

        this.render();
    }

    render() {
        const min = Math.floor(this.currentTime / 60);
        const sec = Math.floor(this.currentTime % 60);

        this.timerNode.textContent = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
    }

    initialize(gameMode) {
        this.initializedTime = gameMode.timeLimit;
        this.currentTime = this.initializedTime;
        this.timerNode.textContent = this.initializedTime;
        this.stop();
        this.render();
    }

    start() {
        this.timer = setInterval(() => {
            this.currentTime -= 1;
            this.render();
            if (this.currentTime === 0) {
                this.stop();
                document.getElementById('app').style.pointerEvents = 'none';
                alert('GAME OVER !!!');
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.timer);
    }

    getRemainingTime() {
        return this.currentTime;
    }
}