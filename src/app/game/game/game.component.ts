import { Component, OnInit } from '@angular/core';
import {Card, FieldID, Game} from '../../core/model.game';
import {OpenAction, RegularMoveAction} from '../../core/model.action';
import {RestGameService} from '../../core/rest-game.service';

@Component({
  selector: 'tac-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public game: Game;

  constructor(private restService: RestGameService) { }

  ngOnInit() {
    const names = ['1', '2', '3', '4'];
    this.loadGame();
  }

  private loadGame() {
    this.restService.getGame((resp) => this.game = resp, () => this.loadGame());
  }

  public doOpen() {
    this.restService.doAction(new OpenAction(Card.One, 0, new FieldID(0, 0, false)), (resp) => this.game = resp, () => this.loadGame());
  }

  public doMove() {
    this.restService.doAction(new RegularMoveAction(Card.One, new FieldID(0, 0, false), new FieldID(1, 0, false)), (resp) => this.game = resp, () => this.loadGame());
  }

}
