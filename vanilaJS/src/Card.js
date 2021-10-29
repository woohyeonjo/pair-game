function Card() {
    this.card = document.createElement('div');
    // card view //

    return this.card;
}

Card.prototype.updateStyles = function(style) {
    this.card.style = style;
}


Card.prototype.onclick = function(event) {
    
}