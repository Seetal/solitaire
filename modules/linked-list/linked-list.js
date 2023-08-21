export class LinkedList {
    constructor () {
        this.head = null; // First element of the list
        this.tail = null; // Last element of the list
        this.current = null; // Current Item when undoing
    }
    append(value) {
        const newNode = { value: value, next: null, previous: null };
        if (this.tail) {
            newNode.previous = this.tail;
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.current = newNode;
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
    }

    stepBack() {
        this.current = this.current.previous;
    }
    stepForward() {
        if (this.current !== null) {
            this.current = this.current.next;
        } else {
            this.current = this.head;
        }
    }

    prepend(value) {
        const newNode = { value: value, next: null, previous: null }
        if (this.head) {
            newNode.next = this.head;
            this.head.previous = newNode;
        }
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
    }

    insertAfter(value, afterValue) {
        const existingNode = this.find(afterValue);
        if (existingNode) {
            let existingNext = existingNode.next;
            const newNode = { value: value, next: existingNode.next, previous: existingNode }
            existingNext.previous = newNode;
            existingNode.next = newNode;
        }
    }

    find(value) {
        if (!this.head) {
            return null;
        }
        let curNode = this.head;

        while(curNode) {
            if(curNode.value === value) {
                return curNode;
            }
            curNode = curNode.next;
        }
        return null;
    }

    delete(value) {
        if (!this.head) {
            return null;
        }

        if(this.head.value === value) {
            if (this.head.next) {
                this.head = this.head.next;
                this.head.previous = null;
                return;
            } else {
                this.head = null;
                return;
            }
        }

        let curNode = this.head;

        while (curNode.next) {
            if ((curNode.next.value === value) && (curNode.next !== this.tail)) {
                let nodeAfter = curNode.next.next;
                curNode.next = nodeAfter;
                nodeAfter.previous = curNode;
            } else if ((curNode.next.value === value) && (curNode.next === this.tail)) {
                curNode.next = null;
                this.tail = curNode;
            } else {
                curNode = curNode.next;
            }
        }

        // if (this.tail.value === value) {
        //     this.tail = curNode;
        // }

    }

    toArray() {
        const elements = [];
        let curNode = this.head;
        while(curNode) {
            elements.push(curNode);
            curNode = curNode.next;
        }
        return elements;
    }


    // Game specific methods

    buildCardToDom(colDomElement) {
        let curNode = this.head;
        while(curNode) {
            let newCardLi = document.createElement('li');
            newCardLi.setAttribute('class', 'item');
            newCardLi.setAttribute('data-number', curNode.value.number);
            newCardLi.setAttribute('data-color', curNode.value.color);
            newCardLi.setAttribute('data-suit', curNode.value.suit);
            newCardLi.setAttribute('data-card', `${curNode.value.number}${curNode.value.suit}`);
            let card = document.createElement('div');
            card.setAttribute('data-suit', curNode.value.suit);
            card.innerText = curNode.value.card;
            switch (curNode.value.suit) {
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
            if (curNode === this.tail) {
                card.classList.add('show-card');
            }
            newCardLi.appendChild(card);
            colDomElement.appendChild(newCardLi);
            curNode = curNode.next;
        }
    }

}