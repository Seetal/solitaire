import { LinkedList } from "../linked-list/linked-list.js";

export let undo =  {
    undoItem: {},
    undoLinkedList: new LinkedList(),
    updateUndoItems: function(name, value) {
        this.undoItem[name] = value;
    },
    updateLinkedList: function(value) {
        this.undoLinkedList.append(value);
        this.undoItem = {};
    },
    removeAllNodesAfterCurrent: function(value) {
        if (this.undoLinkedList.current) {
            this.undoLinkedList.current.next = null;
            this.undoLinkedList.tail = this.undoLinkedList.current;
        }
    }
}

export const undoRedo = () => {
    const undoButton = document.querySelector('.-js-undo-btn');
    const redoButton = document.querySelector('.-js-redo-btn');

    const undoMove = () => {
        let lastMove = undo.undoLinkedList.current.value;
        let stackToMoveBackTo = document.querySelector(`[data-position="${lastMove.from}"]`)
        if (lastMove.show) {
            if (stackToMoveBackTo.dataset.position !== '5') {
                stackToMoveBackTo.querySelector('.show-card').classList.remove('show-card');
            }
            
        }
        lastMove.cards.forEach((card) => {
            if (lastMove.from === '6' && lastMove.to === '5') {
                card.querySelector('.show-card').classList.remove('show-card');
            }
            stackToMoveBackTo.appendChild(card);
            
        })
        
        undo.undoLinkedList.stepBack();
    }

    const redoMove = () => {
        let currentMove;
        if (undo.undoLinkedList.current !== null) {
            currentMove = undo.undoLinkedList.current.next.value;
        } else {
            currentMove = undo.undoLinkedList.head.value;
        }
        let stackToMoveBackTo = document.querySelector(`[data-position="${currentMove.to}"]`)
        let stackFrom = document.querySelector(`[data-position="${currentMove.from}"]`)
        currentMove.cards.forEach((card) => {
            if (currentMove.from === '6' && currentMove.to === '5') {
                card.querySelector('.card').classList.add('show-card');
            }
            stackToMoveBackTo.appendChild(card);
        })
        if (currentMove.show) {
            let cardToShow = stackFrom.lastChild.querySelector('.card');
            cardToShow.classList.add('show-card');
        }
        undo.undoLinkedList.stepForward();
    }
    
    undoButton.addEventListener('click', () => {
        undoMove();
    })

    redoButton.addEventListener('click', () => {
        redoMove();
    })
}

// { from: data-position, to: data-position, cards: [...], show: null }