import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Game} from './model.game';
import {RestHelperService} from './rest-helper.service';
import {Action} from './model.action';
import {Card} from "./model.card";

@Injectable()
export class RestGameService {

  constructor(private rest: RestHelperService) { }

  public getGame(success: (resp: Game) => void, reload: () => void): Observable<Game> {
    return this.rest.get(this.rest.getGameURL(), success, reload);
  }

  public playCard(card: Card, success: () => void, reload: () => void){
    const url = this.rest.getGameURL();
    return this.rest.post(url, card, success, reload);
  }

  public doAction(action: Action, success: (game: Game) => void, reload: () => void): Observable<Game> {
    const url = this.rest.getGameURL();
    return this.rest.put(url, action, success, reload);
  }

}
