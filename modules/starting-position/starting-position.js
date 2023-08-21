import { cardNames, suits } from "../card-list/cardList.js";
import { buildCards } from "../build-cards/build-cards.js";
import { shuffle } from "../shuffle/shuffle.js";
import { LinkedList } from "../linked-list/linked-list.js";

export const startingPosition = () => {
    let deckOfCards = buildCards(suits, cardNames);
    shuffle(deckOfCards);
    
    let cardCols = [];
    let cardCounter = 0;
    for (let i = 0; i < 7; i++) {
        let indexValue = i + 1;
        cardCols.push(deckOfCards.slice(cardCounter, indexValue + cardCounter))
        cardCounter = cardCounter + indexValue;
    }
    let cardColsLinkedLists = [];
    for (let z = 0; z < cardCols.length; z++) {
        cardColsLinkedLists[z] = new LinkedList();
        cardCols[z].forEach((cardItem) => {
            cardColsLinkedLists[z].append(cardItem);
        })
    }

    deckOfCards.splice(0, 28);
    return { deckOfCards, cardColsLinkedLists };
}
