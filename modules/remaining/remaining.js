export const remaining = (remainingCards) => {
    let remainingHiddenDomNode = document.querySelector('.-js-remaining-hide');
    remainingCards.forEach((currentCard, i) => {
        let newCardLi = document.createElement('li');
        newCardLi.setAttribute('class', 'item');
        // newCardLi.setAttribute('data-number', i + 1);
        newCardLi.setAttribute('data-color', currentCard.color);
        newCardLi.setAttribute('data-number', currentCard.number);
        newCardLi.setAttribute('data-suit', currentCard.suit);
        newCardLi.setAttribute('data-card', `${currentCard.number}${currentCard.suit}`);
        let card = document.createElement('div');
        card.setAttribute('data-suit', currentCard.suit);
        card.innerText = currentCard.card;
        switch (currentCard.suit) {
            case 'diamond':
                card.setAttribute('class', 'card diamond');
                break;
            case 'hart':
                card.setAttribute('class', 'card hart');
                break;
            case 'spade':
                card.setAttribute('class', 'card spade');
                break;
            case 'club':
                card.setAttribute('class', 'card club');
                break;
        }
        newCardLi.appendChild(card);
        remainingHiddenDomNode.appendChild(newCardLi);
    });

    // let cardCounter = 24;
    



    // let cardToPlay;
    // const cardStacks = document.querySelectorAll('.main-stacks');
    // remainingShownDomNode.addEventListener('click', function() {
    //     let topCardCounter = cardCounter + 1;
    //     cardToPlay = remainingShownDomNode.querySelector(`[data-number='${topCardCounter}']`);
    // })
    // cardStacks.forEach(cardStackItem => {
    //     cardStackItem.addEventListener('click', function() {
    //         if (cardToPlay !== null) {
    //             cardStackItem.appendChild(cardToPlay);
    //         }
    //     })
    // })

}