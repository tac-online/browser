import { Component, OnInit } from '@angular/core';
import {FieldID, Game} from '../../core/model.game';
import {RegularOpenAction, RegularMoveAction} from '../../core/model.action';
import {RestGameService} from '../../core/rest-game.service';
import {WebsocketService} from '../../core/websocket.service';
import {Subject} from 'rxjs/Subject';
import {Card} from '../../core/model.card';

@Component({
  selector: 'tac-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public game: Game;
  private socket: Subject<any>;

  constructor(private restService: RestGameService, private websocketService: WebsocketService) { }

  ngOnInit() {
    const names = ['1', '2', '3', '4'];
    this.loadGame();
    this.socket = this.websocketService.createWebsocket();
    this.socket.subscribe(message => this.loadGame());
  }

  private loadGame() {
    this.restService.getGame((resp) => this.game = resp, () => this.loadGame());
  }

  public doOpen() {
    this.restService.doAction(new RegularOpenAction(Card.Thirteen, 0), (resp) => this.game = resp, () => this.loadGame());
  }

  public doMove() {
    this.restService.doAction(new RegularMoveAction(Card.One, new FieldID(0, 0, false), new FieldID(1, 0, false)), (resp) => this.game = resp, () => this.loadGame());
  }

  public playCard(card: Card) {
    this.restService.playCard(card, () => null, this.loadGame);
  }

}
