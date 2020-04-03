import { FieldID } from './model.game';
import {Card} from './model.card';

export abstract class Action {
  card: Card;
  type: string;

  constructor(card: Card, type: string) {
    this.card = card;
    this.type = type;
  }
}

export abstract class MoveAction extends Action {
  srcID: FieldID;
  destID: FieldID;

  constructor(card: Card, srcID: FieldID, destID: FieldID, type: string) {
    super(card, type);
    this.srcID = srcID;
    this.destID = destID;
  }
}

export class AngelMoveAction extends MoveAction {
  constructor(card: Card, srcID: FieldID, destID: FieldID) {
    super(card, srcID, destID, 'AngelMoveAction');
  }
}

export class MoveBackAction extends MoveAction {
  constructor(card: Card, srcID: FieldID, destID: FieldID) {
    super(card, srcID, destID, 'MoveBackAction');
  }
}

export class RegularMoveAction extends MoveAction {
  constructor(card: Card, srcID: FieldID, destID: FieldID) {
    super(card, srcID, destID, 'RegularMoveAction');
  }
}

export class SevenMovePart extends MoveAction {
  constructor(card: Card, srcID: FieldID, destID: FieldID) {
    super(card, srcID, destID, 'SevenMovePart');
  }
}

export abstract class OpenAction extends Action {
  baseNumber: number;
  destID: FieldID;

  constructor(card: Card, basenum: number, destID: FieldID, type: string) {
    super(card, type);
    this.baseNumber = basenum;
    this.destID = destID;
  }
}

export class AngelOpenAction extends OpenAction {
  constructor(card: Card, basenum: number, destID: FieldID) {
    super(card, basenum, destID, 'AngelOpenAction');
  }
}

export class RegularOpenAction extends OpenAction {

  constructor(card: Card, basenum: number, destID: FieldID) {
    super(card, basenum, destID, 'RegularOpenAction');
  }
}

export class DevilAction extends Action {
  action: Action;

  constructor(card: Card, action: Action) {
    super(card, 'DevilAction');
    this.action = action;
  }
}

export class DevilCardAction extends Action {
  devilCard: Card;

  constructor(card: Card, devilCard: Card) {
    super(card, 'DevilCardAction');
    this.devilCard = devilCard;
  }
}

export class DiscardAction extends Action {
  constructor(card: Card) {
    super(card, 'DiscardAction');
  }
}

export class JesterAction extends Action {
  constructor(card: Card) {
    super(card, 'JesterAction');
  }
}

export class MissAction extends Action {
  constructor(card: Card) {
    super(card, 'MissAction');
  }
}

export class SevenAction extends Action {
  actions: SevenMovePart[];

  constructor(card: Card, actions: SevenMovePart[]) {
    super(card, 'SevenAction');
    this.actions = actions;
  }
}

export class TACAction extends Action {
  action: Action;

  constructor(card: Card, action: Action) {
    super(card, 'TACAction');
    this.action = action;
  }
}

export class TricksterAction extends Action {
  firstID: FieldID;
  secondID: FieldID;

  constructor(card: Card, firstID: FieldID, secondID: FieldID) {
    super(card, 'TricksterAction');
    this.firstID = firstID;
    this.secondID = secondID;
  }
}

export class WarriorAction extends Action {
  srcID: FieldID;
  destID: FieldID;

  constructor(card: Card, srcID: FieldID, destID: FieldID) {
    super(card, 'WarriorAction');
    this.srcID = srcID;
    this.destID = destID;
  }
}
