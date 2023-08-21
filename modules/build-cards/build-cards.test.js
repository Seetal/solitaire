import { buildCards } from "./build-cards.js";
import { Card } from "../card/card";

test('first object in array should be ace', () => {
    const cardNames = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
    const suits = ['diamond', 'hart', 'spade', 'club'];
    let listOfCards = buildCards(suits, cardNames);
    expect(listOfCards[0].card).toBe('ace');
})