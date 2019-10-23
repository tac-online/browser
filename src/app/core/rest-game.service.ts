import { Injectable } from '@angular/core';
import {Game} from './model.game';
import {RestHelperService} from './rest-helper.service';
import {Action} from './model.action';
import {Card, CardContainer} from './model.card';

@Injectable()
export class RestGameService {

  constructor(private rest: RestHelperService) { }

  public getGames(success: (resp: [number], version: number) => void, reload: () => void) {
    this.rest.get<[number]>(this.rest.getGameServiceURL() + 'games/', success, reload);
  }

  public createGame(success: (resp: number) => void, reload: () => void) {
    this.rest.post<number, undefined>(this.rest.getGameServiceURL() + 'games/', null, success, reload);
  }

  public deleteGame(gameid: number, success: () => void, reload: () => void) {
    this.rest.delete<undefined>(this.rest.getGameServiceURL() + 'game/' + gameid, success, reload);
  }

  public getGame(game: string, success: (resp: Game, version: number) => void, reload: () => void) {
    this.rest.get<Game>(this.rest.getGameServiceURL() + 'game/' + game, success, reload);
  }

  public playCard(game: string, card: Card, success: (resp: Game, version: number) => void, reload: () => void) {
    const url = this.rest.getGameServiceURL() + 'game/' + game;
    this.rest.post(url, new CardContainer(card), success, reload);
  }

  public doAction(game: string, action: Action, success: (resp: Game, version: number) => void, reload: () => void) {
    const url = this.rest.getGameServiceURL() + 'game/' + game;
    this.rest.put(url, action, success, reload);
  }

  public simulateAction(game: string, action: Action, success: (game: Game, version: number) => void, reload: () => void) {
    const url = this.rest.getGameServiceURL() + 'game/' + 'simulate/' + game;
    this.rest.put(url, action, success, reload);
  }

}
