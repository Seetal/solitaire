import { LinkedList } from "./linked-list.js";

describe('Testing LinkedList class', () => {
    test('create new node', () => {
        const newLinkedList = new LinkedList();
        newLinkedList.append('First Item');
        expect(newLinkedList.toArray().length).toBe(1);
        expect(newLinkedList.toArray()[0].value).toBe('First Item');
    })
})