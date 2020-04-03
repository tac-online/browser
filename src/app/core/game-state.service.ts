import {Injectable} from '@angular/core';
import {Card} from './model.card';
import {Game} from './model.game';
import {RestGameService} from './rest-game.service';
import {Observable, Subscription} from 'rxjs';
import {ClientMessage} from './model';
import {WebsocketService} from './websocket.service';
import {ActionService} from './action.service';
import {TurnStateService} from './turn-state.service';
import {Action} from './model.action';

@Injectable()
export class GameStateService {

  private gameName: string;
  private version: number;

  private game: Game;
  private socket: Observable<ClientMessage>;
  private subscription: Subscription;

  constructor(private restGameService: RestGameService, private websocketService: WebsocketService, private actionService: ActionService, private turnStateService: TurnStateService) {
    this.actionService.init(this.simulateAction.bind(this));
  }

  public getPlayer(): number {
    return this.game.turn;
  }

  public getGame(): Game {
    return this.game;
  }

  public getGameName(): string {
    return this.gameName;
  }

  public setGameName(gameName: string) {
    this.gameName = gameName;
    this.loadGame();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.socket = this.websocketService.subscribe('tac-game-server', 'game/');
    this.subscription = this.socket.subscribe(resp => {
      if (this.version < resp.version && resp.payload === this.gameName) {
        console.log('reloading');
        this.loadGame();
      }
    });
  }

  public loadGame() {
    console.log('load game');
    this.restGameService.getGame(this.gameName, (game, version) => {
      this.setGame(game, version);
    }, () => this.loadGame());
  }

  public playCard(card: Card) {
    this.restGameService.playCard(this.gameName, card, (game, version) => {
      this.setGame(game, version);
    }, () => this.loadGame());
  }

  public setGame(game: Game, version: number) {
    this.turnStateService.resetAll();
    if (game.currentCard) {
      this.turnStateService.cardPlayed = true;
    } else {
      this.turnStateService.playCard = true;
    }
    if (game && game.currentCard) {
      this.actionService.initAction(game, this.gameName);
    }
    this.game = game;
    this.version = version;
  }

  private execAction(action: Action) {
    this.restGameService.doAction(this.gameName, action, (g, version) => {
      this.setGame(g, version);
    }, this.loadGame.bind(this));
  }

  private simulateAction(action: Action) {
    if (action.type === 'MissAction') {
      this.execAction(action);
    } else {
      this.restGameService.simulateAction(this.getGameName(), action, (g, version) => {
        this.game = g;
        this.turnStateService.pressFinish = true;
        this.actionService.pressFinishButton().then(() => {
          this.execAction(action);
        });
      }, () => this.loadGame());
    }
  }
}
