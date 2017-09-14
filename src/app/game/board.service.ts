import { Injectable } from '@angular/core';
import {Base, Board, Field, Marble, Player} from '../core/model.game';

@Injectable()
export class BoardService {

  constructor() { }

  createBoard(names: string[]): Board {
    const players: Player[] = [];
    const track: Field[] = [];
    const homes: Field[][] = [];
    const bases: Base[] = [];
    let stones: Marble[];


    for (let i = 0; i < 64; i++) {
      track[i] = new Field(null, i, 0, false, false);
    }
    for (let player = 0; player < 4; player++) {
      homes[player] = [];
      players[player] = new Player(names[player]);
      stones = [];
      for (let i = 0; i < 4; i++) {
        stones[i] = new Marble(player, false);
        homes[player][i] = new Field(null, i, player, false, true);
      }
      bases[player] = new Base(stones, player);
      track[16 * player] = new Field(null, 16 * player, player, true, false);
    }



    return new Board(track, homes, bases);
  }

}
