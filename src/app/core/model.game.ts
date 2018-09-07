import {Card} from './model.card';

export class Player {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class Position {
  isBase: boolean;
  field: Field;
  base: Base;

  constructor(base: Base, field: Field, isBase: boolean) {
    this.base = base;
    this.isBase = isBase;
    this.field = field;
  }

  public static fromBase(base: Base): Position {
    return new Position(base, null, true);
  }

  public static fromField(field: Field): Position {
    return new Position(null, field, false);
  }
}

export class Marble {
  owner: number;
  moved: boolean;

  constructor(owner: number, moved: boolean) {
    this.owner = owner;
    this.moved = moved;
  }
}

export class Field {
  occupier: Marble;
  number: number;
  player: number;
  startField: boolean;
  homeField: boolean;

  constructor(occupier: Marble, number: number, player: number, startField: boolean, homeField: boolean) {
    this.occupier = occupier;
    this.number = number;
    this.player = player;
    this.startField = startField;
    this.homeField = homeField;
  }
}

export class FieldID {
  number: number;
  player: number;
  homeField: boolean;

  constructor(number: number, player: number, homeField: boolean) {
    this.number = number;
    this.player = player;
    this.homeField = homeField;
  }

  public static fromField(field: Field): FieldID {
    return new FieldID(field.number, field.player, field.homeField);
  }
}

export class Base {
  occupiers: Marble[];
  player: number;

  constructor(stones: Marble[], player: number) {
    this.occupiers = stones;
    this.player = player;
  }
}

export class Board {
  track: Field[];
  homes: Field[][];
  bases: Base[];

  constructor(track: Field[], homes: Field[][], bases: Base[]) {
    this.track = track;
    this.homes = homes;
    this.bases = bases;
  }
}

export class Game {
  board: Board;
  players: Player[];
  cards: Card[][];
  currentCard: Card;
  turn: number;
  devilPlayed: boolean;
  devilCard: Card;

  constructor(board: Board, players: Player[], cards: Card[][], currentCard: Card, turn: number, devilPlayed: boolean, devilCard: Card) {
    this.board = board;
    this.players = players;
    this.cards = cards;
    this.currentCard = currentCard;
    this.turn = turn;
    this.devilPlayed = devilPlayed;
    this.devilCard = devilCard;
  }
}



export abstract class Subaction {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
}

export class PickMarbleSubaction extends Subaction {
  marble: Position;

  constructor(marble: Position) {
    super('marble');
    this.marble = marble;
  }
}

export class PickFieldSubaction extends Subaction {
  field: Field;

  constructor(field: Field) {
    super('field');
    this.field = field;
  }

}

