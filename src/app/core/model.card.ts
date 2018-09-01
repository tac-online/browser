

export enum Card {
  One = 'One',
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
  Five = 'Five',
  Six = 'Six',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Twelve = 'Twelve',
  Thirteen = 'Thirteen',
  TAC = 'TAC',
  Trickster = 'Trickster',
  Jester = 'Jester',
  Angel = 'Angel',
  Warrior = 'Warrior',
  Devil = 'Devil'
}

export class CardContainer {
  card: Card;

  constructor(card: Card) {
    this.card = card;
  }
}

// export function getPossibleActions(card: Card): SubactionSequence[] {
//   switch (card) {
//     case null:
//       return [];
//     case Card.Thirteen:
//     case Card.One:
//       return [
//         new SubactionSequence([new PickMarble(), new PickField()], (seq: SubactionSequence) => {
//           const field = seq.getResult(0);
//           if (field) {
//             return new RegularOpenAction(card, field.toFieldID().player);
//           } else {
//             return new RegularMoveAction(card, field.toFieldID(), seq.getResult(1).toFieldID());
//           }
//         })
//       ];
//     default:
//       return [
//         new SubactionSequence([new PickMarble(), new PickField()], (seq: SubactionSequence) => {
//           const field = seq.getResult(0);
//           return new RegularMoveAction(card, field.toFieldID(), seq.getResult(1).toFieldID());
//         })
//       ];
//   }
// }
