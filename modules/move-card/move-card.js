import { undo } from "../undo/undo.js";

export const moveCard = () => {
    const startingCols = document.querySelector('.starting-cols');
    let remainingHiddenDomNode = document.querySelector('.-js-remaining-hide');
    let remainingShownDomNode = document.querySelector('.-js-remaining-show');
    let cardToMove = '';
    let doneStacks = document.querySelector('.done-stacks');

    // Keep a record of how many cards are in done stack
    let doneCards = {
        club: 0,
        spade: 0,
        hart: 0,
        diamond: 0
    }

    const updateUndoObject = (cardListToMove, targetDoneStack) => {
        undo.updateUndoItems('cards', cardListToMove);
        undo.updateUndoItems('to', targetDoneStack.dataset.position);
        undo.removeAllNodesAfterCurrent();
        undo.updateLinkedList(undo.undoItem);
        cardListToMove = [];
    }

    // If moving more than one card, get all the cards above the selected card
    const getAllCardsAboveClickedCard = () => {
        let cardListToMove = [];
        let currentCardToMove = cardToMove;
        cardListToMove.push(currentCardToMove);
        while(currentCardToMove.nextSibling) {
            cardListToMove.push(currentCardToMove.nextSibling);
            currentCardToMove = currentCardToMove.nextSibling;
        }
        return cardListToMove;
    }

    // If there is a hidden card below the selcted card then show that card
    const showCardBelow = () => {
        let isShowCard;
        if (cardToMove.previousSibling && (cardToMove.previousSibling.nodeType === Node.ELEMENT_NODE)) {
            cardToMove.previousSibling.querySelector('.card').classList.add('show-card');
            isShowCard = true;
        }
        return isShowCard;
    }

    // Only the king can move to an empty space
    const moveKing = (emptySpace) => {
        let cardListToMove = getAllCardsAboveClickedCard();
        if (parseInt(cardToMove.dataset.number) === 13) {
            undo.updateUndoItems('from', cardToMove.parentNode.dataset.position);
            let isShowCard = showCardBelow();
            cardListToMove.forEach((card) => {
                emptySpace.appendChild(card);
            })
            if (isShowCard) {
                undo.updateUndoItems('show', true);
            }
            updateUndoObject(cardListToMove, emptySpace);
        }
    }

    // Check whether the selected card to move is the next number up to target placement
    const moveCardLogic = (parentUl, cardBelow) => {
        let cardListToMove = getAllCardsAboveClickedCard();
        if ((parseInt(cardToMove.dataset.number) + 1) === parseInt(cardBelow.dataset.number) && (cardToMove.dataset.color !== cardBelow.dataset.color)) {
            undo.updateUndoItems('from', cardToMove.parentNode.dataset.position);
            let isShowCard = showCardBelow();
            cardListToMove.forEach((card) => {
                parentUl.appendChild(card);
            })
            if (isShowCard) {
                undo.updateUndoItems('show', true);
            }
            updateUndoObject(cardListToMove, parentUl);
        }
        else {
            cardListToMove = [];
        }
    }

    // Move to done list
    const movetoDone = (targetDoneStack, targetDoneElement) => {
        let doneSuit = targetDoneElement.dataset.suit;
        let cardToMoveNumber = parseInt(cardToMove.dataset.number - 1);
        if ((cardToMove.querySelector('.card').dataset.suit === doneSuit) && cardToMoveNumber ===  doneCards[doneSuit]) {
            undo.updateUndoItems('from', cardToMove.parentNode.dataset.position);
            let cardListToMove = [];
            cardListToMove.push(cardToMove);
            let isShowCard = showCardBelow();
            targetDoneStack.appendChild(cardToMove);
            if (isShowCard) {
                undo.updateUndoItems('show', true);
            }
            updateUndoObject(cardListToMove, targetDoneStack);
            doneCards[doneSuit] += 1;
        }
    }


    startingCols.addEventListener('click', (e) => {
        // First click to select card to move
        if ((e.target.classList.contains('show-card')) && (cardToMove === '')) {
            cardToMove = e.target.parentNode;
        } else if ((e.target.classList.contains('show-card')) && (cardToMove !== '')) {
            let cardBelow = e.target.parentNode;
            let parentUl = e.target.parentNode.parentNode;
            moveCardLogic(parentUl, cardBelow)
            cardToMove = '';
        }
        if ((e.target.classList.contains('main-stacks')) && (cardToMove !== '')) {
            let emptySpace = e.target;
            moveKing(emptySpace);
            cardToMove = '';
        }
    })

    doneStacks.addEventListener('click', (e) => {
        if ((e.target.classList.contains('done-list')) && (cardToMove !== '')) {
            let targetDoneStack = e.target;
            let targetDoneElement = e.target;
            movetoDone(targetDoneStack, targetDoneElement);
            cardToMove = '';
        } else if ((e.target.classList.contains('card')) && (cardToMove !== '')) {
            let targetDoneStack = doneStacks.querySelector(`[data-suit="${e.target.dataset.suit}"]`);
            let targetDoneElement = e.target;
            movetoDone(targetDoneStack, targetDoneElement);
            cardToMove = '';
        }
    });

    remainingHiddenDomNode.addEventListener('click', function(e) {
        if (e.target.classList.contains('card')) {
            e.target.classList.add('show-card');
            let elementToMove = e.target.parentNode;
            let cardListToMove = [];
            cardListToMove.push(elementToMove);
            undo.updateUndoItems('from', elementToMove.parentNode.dataset.position);
            remainingShownDomNode.appendChild(elementToMove);
            updateUndoObject(cardListToMove, remainingShownDomNode);
        }
    })
    remainingShownDomNode.addEventListener('click', function(e) {
        if ((e.target.classList.contains('show-card')) && (cardToMove === '')) {
            cardToMove = e.target.parentNode;
        }
    })
}