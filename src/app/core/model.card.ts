import {Action, RegularMoveAction} from './model.action';

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

export const ACTIONS: (() => Action)[] = [];
