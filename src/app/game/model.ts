export class Player {
  name: string;
  local: boolean;

  constructor(name: string, local: boolean) {
    this.name = name;
    this.local = local;
  }
}

export class Stone {
  owner: number;

  constructor(owner: number) {
    this.owner = owner;
  }
}

export abstract class Field {
  occupier: Stone;
  startingField = false;
  homeField = false;
}

export class TrackField extends Field {
  number: number;

  constructor(number: number) {
    super();
    this.number = number;
  }
}

export class HomeField extends Field {
  number: number;
  player: number;

  constructor(number: number, player: number) {
    super();
    this.number = number;
    this.player = player;
    this.homeField = true;
  }
}

export class StartingField extends TrackField {
  player: number;

  constructor(number: number, player: number) {
    super(number);
    this.player = player;
    this.startingField = true;
  }
}

export class Base {
  occupiers: Stone[];

  constructor(stones: Stone[]) {
    this.occupiers = stones;
  }
}

export class Board {
  players: Player[];
  track: TrackField[];
  homes: HomeField[][];
  bases: Base[];

  constructor(players: Player[], track: TrackField[], homes: HomeField[][], bases: Base[]) {
    this.players = players;
    this.track = track;
    this.homes = homes;
    this.bases = bases;
  }
}

