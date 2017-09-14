import { Card, FieldID } from './model.game';

export abstract class Action {
  card: Card;
  type: string;

  constructor(card: Card, type: string) {
    this.card = card;
    this.type = type;
  }
}

export class AngelMoveAction extends Action {
  srcID: FieldID;
  destID: FieldID;

  constructor(card: Card, srcID: FieldID, destID: FieldID) {
    super(card, 'AngelMoveAction');
    this.srcID = srcID;
    this.destID = destID;
  }
}

export class AngelOpenAction extends Action {
  basenum: number;
  fieldID: FieldID;

  constructor(card: Card, basenum: number, fieldID: FieldID) {
    super(card, 'AngelOpenAction');
    this.basenum = basenum;
    this.fieldID = fieldID;
  }
}

export class DevilAction extends Action {
}

export class DiscardAction extends Action {
}

export class JesterAction extends Action {
}

export class MissAction extends Action {
}

export class MoveBackAction extends Action {
  srcID: FieldID;
  destID: FieldID;

  constructor(card: Card, srcID: FieldID, destID: FieldID) {
    super(card, 'MoveBackAction');
    this.srcID = srcID;
    this.destID = destID;
  }
}

export class OpenAction extends Action {
  basenum: number;
  fieldID: FieldID;

  constructor(card: Card, basenum: number, fieldID: FieldID) {
    super(card, 'OpenAction');
    this.basenum = basenum;
    this.fieldID = fieldID;
  }
}

export class RegularMoveAction extends Action {
  srcID: FieldID;
  destID: FieldID;

  constructor(card: Card,  srcID: FieldID, destID: FieldID) {
    super(card, 'RegularMoveAction');
    this.srcID = srcID;
    this.destID = destID;
  }
}

export class SevenAction extends Action {
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

  constructor(card: Card, srcID: FieldID) {
    super(card, 'WarriorAction');
    this.srcID = srcID;
  }
}
