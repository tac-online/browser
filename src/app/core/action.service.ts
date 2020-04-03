import { Injectable } from '@angular/core';
import {Card} from './model.card';
import {FieldID, Game, Position} from './model.game';
import {
  Action,
  AngelMoveAction, AngelOpenAction, DevilAction, DevilCardAction,
  JesterAction,
  MissAction,
  MoveBackAction,
  RegularMoveAction,
  RegularOpenAction, SevenAction, SevenMovePart,
  TricksterAction,
  WarriorAction
} from './model.action';
import {TurnStateService} from './turn-state.service';

@Injectable()
export class ActionService {

  private parts: SevenMovePart[];

  public moveMarbleResolve: (move: [Position, Position]) => void;
  public skipPlayerResolve: () => void;
  public finishResolve: () => void;

  private simulateAction: (Action) => void;

  constructor(private turnStateService: TurnStateService) { }

  public moveMarble(): Promise<[Position, Position]> {
    this.turnStateService.moveMarble = true;
    return new Promise<[Position, Position]>(resolve => {
      this.moveMarbleResolve = (move) => {
        this.turnStateService.marbleMoved = true;
        this.turnStateService.moveMarble = false;
        resolve(move);
      };
    });
  }

  public pressSkipButton(): Promise<void> {
    this.turnStateService.pressSkip = true;
    return new Promise<void>(resolve => {
      this.skipPlayerResolve = resolve;
    });
  }

  public pressFinishButton(): Promise<void> {
    this.turnStateService.pressFinish = true;
    return new Promise<void>(resolve => {
      this.finishResolve = resolve;
    });
  }

  public init(simulateAction: (Action) => void) {
    this.simulateAction = simulateAction;
  }

  public initAction(game: Game, gameName: string) {
    this.moveMarbleResolve = null;
    /*this.doAction(game.currentCard).then(action => {
      this.action = action;
      this.simulateAction(gameName, game);
    }).catch(() => this.initAction(game, gameName));*/
    this.doAction(game.currentCard).then(action => this.simulateAction(action)).catch(() => this.initAction(game, gameName));
  }

  /*public sendAction(action: Action, gameName: string, game: Game) {
    this.moveMarbleResolve = null;
    this.restGameService.doAction(gameName, action, (g, version) => {
      this.setGame(g, version);
    }, () => this.initAction(game, gameName));
  }*/

  public doAction(card: Card): Promise<Action> {
    switch (card) {
      case Card.One:
      case Card.Thirteen:
        return new Promise<Action>(resolve => {
          this.moveMarble().then(move => {
            if (move[0].isBase && !move[1].isBase) {
              resolve(new RegularOpenAction(card, move[0].base.player, FieldID.fromField(move[1].field)));
            } else if (!move[0].isBase && !move[1].isBase) {
              resolve(new RegularMoveAction(card, FieldID.fromField(move[0].field), FieldID.fromField(move[1].field)));
            }
          });
        });

      case Card.Warrior:
        return new Promise<Action>(resolve => {
          this.moveMarble().then(move => {
            if (!move[0].isBase && !move[1].isBase) {
              resolve(new WarriorAction(card, FieldID.fromField(move[0].field), FieldID.fromField(move[1].field)));
            }
          });
        });

      case Card.Trickster:
        return new Promise<Action>(resolve => {
          this.moveMarble().then(move => {
            if (!move[0].isBase && !move[1].isBase) {
              resolve(new TricksterAction(card, FieldID.fromField(move[0].field), FieldID.fromField(move[1].field)));
            }
          });
        });

      case Card.Four:
        return new Promise<Action>(resolve => {
          this.moveMarble().then(move => {
            if (!move[0].isBase && !move[1].isBase) {
              resolve(new MoveBackAction(card, FieldID.fromField(move[0].field), FieldID.fromField(move[1].field)));
            }
          });
        });

      case Card.Eight:
        return new Promise<Action>(resolve => {
          this.moveMarble().then(move => {
            if (!move[0].isBase && !move[1].isBase) {
              resolve(new RegularMoveAction(card, FieldID.fromField(move[0].field), FieldID.fromField(move[1].field)));
            }
          });
          this.pressSkipButton().then(() => {
            resolve(new MissAction(card));
          });
        });

      case Card.Jester:
        return new Promise<Action>(resolve => {
          resolve(new JesterAction(card));
        });

      case Card.Angel:
        return new Promise<Action>(resolve => {
          this.moveMarble().then(move => {
            if (move[0].isBase && !move[1].isBase) {
              resolve(new AngelOpenAction(card, move[0].base.player, FieldID.fromField(move[1].field)));
            } else if (!move[0].isBase && !move[1].isBase) {
              resolve(new AngelMoveAction(card, FieldID.fromField(move[0].field), FieldID.fromField(move[1].field)));
            }
          });
        });

      case Card.Seven:
        return new Promise<Action>(resolve => {
          this.parts = [];
          this.getSevenMovePart(card);
          this.pressFinishButton().then(() => {
            resolve(new SevenAction(card, this.parts));
          });
        });
/*
      case Card.Devil:
        if (this.getGame().devilPlayed) {
          return new Promise<Action>(resolve => {
            this.doAction(this.getGame().devilCard, gameComp).then(action => resolve(new DevilAction(card, action)));
          });
        } else {
          return new Promise<Action>(resolve => {
            gameComp.pickCardDevil().then(devilcard => {
              this.restService.doAction(this.getGameName(), new DevilCardAction(card, devilcard), () => {}, () => {
                this.doAction(card, gameComp);
              });
            });
          });
        }*/

      default:
        return new Promise<Action>((resolve, reject) => {
          this.moveMarble().then(move => {
            if (!move[0].isBase && !move[1].isBase) {
              resolve(new RegularMoveAction(card, FieldID.fromField(move[0].field), FieldID.fromField(move[1].field)));
            }
          });
        });


    }
  }
  private getSevenMovePart(card: Card) {
    this.moveMarble().then(move => {
      if (!move[0].isBase && !move[1].isBase) {
        this.parts.push(new SevenMovePart(card, FieldID.fromField(move[0].field), FieldID.fromField(move[1].field)));
        move[0].field.occupier['used'] = true;
        this.simulateAction(new SevenAction(card, this.parts));
        this.getSevenMovePart(card);
      }
    });
  }

  /*private simulateAction(gameComp: GameComponent, action: Action) {
    this.restService.simulateAction(this.getGameName(), action, game => this.gameStateService.setGame(game), () => this.simulateAction(gameComp, action));
  }*/

}
