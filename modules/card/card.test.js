import { Card } from "./card.js";

test('create a card object', () => {
    let aceOfHarts = new Card('Ace', 'Hart', 'Red', 1);
    expect(aceOfHarts).toEqual({ card: 'Ace', suit: 'Hart', color: 'Red', number: 1 });
})