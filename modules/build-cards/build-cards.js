import { Card } from "../card/card.js";

export const buildCards = (suits, cardNames) => {
    let cardList = [];
    suits.forEach((suitItem) => {
        let color = (suitItem === 'diamond' || suitItem === 'hart') ? 'red' : 'black';
        for ( let i = 0; i < cardNames.length; i++ ) {
            let newCard = new Card(cardNames[i], suitItem, color, i + 1);
            cardList.push(newCard);
        }
    });
    return cardList;
}