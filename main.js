import { startingPosition } from "./modules/starting-position/starting-position.js";
import { buildStartingCols } from "./modules/build-starting-cols/build-starting-cols.js";
import { LinkedList } from "./modules/linked-list/linked-list.js";
import { undoRedo } from "./modules/undo/undo.js";
import { remaining } from "./modules/remaining/remaining.js";
import { moveCard } from "./modules/move-card/move-card.js";

let newDeck = startingPosition();
buildStartingCols(newDeck);
remaining(newDeck.deckOfCards);
moveCard();
undoRedo();




// const testList = new LinkedList();

// testList.append('First Item');
// testList.append('Second Item');
// testList.append('third Item');
// testList.prepend('Zero Item');
// testList.prepend('minus one Item');
// testList.insertAfter('Two and half item', 'Second Item');
// testList.stepBack();
// console.table(testList.toArray());
// console.log(testList);
