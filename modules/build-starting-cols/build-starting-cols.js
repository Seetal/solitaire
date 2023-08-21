export const buildStartingCols = (deck) => {
    deck.cardColsLinkedLists.forEach((cardCol, i) => {
        let colNumber = i + 1;
        let colDomElement = document.querySelector(`[data-col="${colNumber}"]`);
        cardCol.buildCardToDom(colDomElement);
    })
}