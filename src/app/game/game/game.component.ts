import {Component, OnInit, ViewChild} from '@angular/core';
import {FieldID} from '../../core/model.game';
import {RestGameService} from '../../core/rest-game.service';
import {WebsocketService} from '../../core/websocket.service';
import {ActionService} from '../../core/action.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameStateService} from '../../core/game-state.service';
import {BoardComponent} from '../board/board.component';
import {TurnStateService} from '../../core/turn-state.service';

@Component({
  selector: 'tac-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('board')
  private board: BoardComponent;

  public pickFieldResolve: (Field) => void;
  public pressButtonResolve: () => void;
  public buttonText: string;
  public pickMarbleResolve: (Position) => void;
  public chooseCardDevilResolve: (Card) => void;

  public specialMarbles: [FieldID, boolean][] = [];

  constructor(private restService: RestGameService, private websocketService: WebsocketService, public actionService: ActionService, private route: ActivatedRoute, public router: Router, public gameStateService: GameStateService, public turnStateService: TurnStateService) { }

  ngOnInit() {
    const names = ['1', '2', '3', '4'];
    this.route.params.subscribe((params: Params) => this.loadData(params));
  }

  private loadData(params: Params) {
    const gameName = params['game'];
    this.gameStateService.setGameName(gameName);
  }

  /*public doAction() {
    if (this.board) {
      this.board.highlights = [];
      this.board.draw(false);
    }
    this.pressButtonResolve = null;
    this.pickFieldResolve = null;
    this.pickMarbleResolve = null;
    this.chooseCardDevilResolve = null;
    this.actionService.doAction(this.game.currentCard, this).then(action => this.sendAction(action)).catch(() => this.doAction());
  }

  public sendAction(action: Action) {
    this.pressButtonResolve = null;
    this.pickFieldResolve = null;
    this.pickMarbleResolve = null;
    this.chooseCardDevilResolve = null;
    if (this.board) {
      this.board.highlights = [];
      this.board.draw(false);
    }
    this.restService.doAction(this.gameName, action, (game,version) => {
      this.game = game;
      this.version = version;
    }, () => this.doAction());
  }

  public playCard(card: Card) {
    this.restService.playCard(this.gameName, card, (game,version) => {
      this.game = game;
      this.version = version;
    }, () => this.loadGame(this.gameName));
  }

  public pickField(): Promise<Field> {
    return new Promise<Field>(resolve => {
      this.pickFieldResolve = resolve;
    });
  }

  public pickMarble(): Promise<Position> {
    return new Promise<Position>(resolve => {
      this.pickMarbleResolve = resolve;
    });
  }

  public pickCardDevil(): Promise<Card> {
    return new Promise<Card>(resolve => {
      this.chooseCardDevilResolve = resolve;
    });
  }

  public pressButton(text: string): Promise<any> {
    this.buttonText = text;
    return new Promise<any>(resolve => {
      this.pressButtonResolve = resolve;
    });
  }

  public buttonPressed() {
    if (this.pressButtonResolve) {
      this.pressButtonResolve();
      this.pressButtonResolve = null;
    }
  }

  public fieldPicked(event: {field: Field, coords: Coordinates}) {
    if (this.pickFieldResolve) {
      this.pickFieldResolve(event.field);
      this.pickFieldResolve = null;
      this.board.highlights.push(event.coords);
      this.board.draw(false);
    }
  }

  public marblePicked(event: {marble: Position, coords: Coordinates}) {
    if (this.pickMarbleResolve) {
      this.pickMarbleResolve(event.marble);
      this.pickMarbleResolve = null;
      this.board.highlights.push(event.coords);
      this.board.draw(false);
    }
  }



  public cardChosen(card: Card) {
    if (this.chooseCardDevilResolve) {
      this.chooseCardDevilResolve(card);
      this.chooseCardDevilResolve = null;
    }
  }

  public showLastTurn() {
    this.specialMarbles = [];
    if (this.game.lastAction.type.includes('Move')) {
      const action = <MoveAction> this.game.lastAction;
      this.specialMarbles.push([action.srcID, false]);
      this.specialMarbles.push([action.destID, true]);
    } else if (this.game.lastAction.type.includes('OpenAction')) {
      const action = <OpenAction> this.game.lastAction;
      this.specialMarbles.push([new FieldID(action.baseNumber * 16, action.baseNumber, false), true]);
    } else if (this.game.lastAction.type.includes('TricksterAction')) {
      const action = <TricksterAction> this.game.lastAction;
      this.specialMarbles.push([action.firstID, true]);
      this.specialMarbles.push([action.secondID, true]);
    }
  }

  public hideLastTurn() {
    this.specialMarbles = [];
  }*/
}
