import { Injectable } from '@angular/core';
import {Base, Board, HomeField, Player, StartingField, Stone, TrackField} from './model';

@Injectable()
export class BoardService {

  constructor() { }

  createBoard(names: string[]): Board {
    const players: Player[] = [];
    const track: TrackField[] = [];
    const homes: HomeField[][] = [];
    const bases: Base[] = [];
    let stones: Stone[];


    for (let i = 0; i < 64; i++) {
      track[i] = new TrackField(i);
    }
    for (let player = 0; player < 4; player++) {
      homes[player] = [];
      players[player] = new Player(names[player], player === 0);
      stones = [];
      for (let i = 0; i < 4; i++) {
        stones[i] = new Stone(player);
        homes[player][i] = new HomeField(i, player);
      }
      bases[player] = new Base(stones);
      track[16 * player] = new StartingField(16 * player, player);
    }



    return new Board(players, track, homes, bases);
  }

}
