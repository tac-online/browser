import {Card} from './model.card';

export class Player {
  name: string;

  constructor(name: string) {
    this.name = name;
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

  constructor(board: Board, players: Player[], cards: Card[][], currentCard: Card) {
    this.board = board;
    this.players = players;
    this.cards = cards;
    this.currentCard = currentCard;
  }
}

