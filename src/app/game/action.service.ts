import { Injectable } from '@angular/core';
import {GameComponent} from './game/game.component';
import {Card} from '../core/model.card';
import {FieldID} from '../core/model.game';
import {
  Action,
  AngelMoveAction, AngelOpenAction, DevilAction,
  JesterAction,
  MissAction,
  MoveBackAction,
  RegularMoveAction,
  RegularOpenAction, SevenAction, SevenMovePart,
  TricksterAction,
  WarriorAction
} from '../core/model.action';
import {RestGameService} from '../core/rest-game.service';

@Injectable()
export class ActionService {

  private parts: SevenMovePart[];

  constructor(private restService: RestGameService) { }

  public doAction(card: Card, gameComp: GameComponent): Promise<Action> {
    switch (card) {
      case Card.One:
      case Card.Thirteen:
        return new Promise<Action>(resolve => {
          gameComp.pickMarble().then(marble => {
            if (marble.isBase) {
              resolve(new RegularOpenAction(card, marble.base.player));
            } else {
              gameComp.pickField().then(field => {
                resolve(new RegularMoveAction(card, FieldID.fromField(marble.field), FieldID.fromField(field)));
              });
            }
          });
        });

      case Card.Warrior:
        return new Promise<Action>(resolve => {
          gameComp.pickMarble().then(marble => {
            if (!marble.isBase) {
              resolve(new WarriorAction(card, FieldID.fromField(marble.field)));
            }
          });
        });

      case Card.Trickster:
        return new Promise<Action>(resolve => {
          gameComp.pickMarble().then(marble => {
            if (!marble.isBase) {
              gameComp.pickMarble().then(marble2 => {
                if (!marble2.isBase) {
                  resolve(new TricksterAction(card, FieldID.fromField(marble.field), FieldID.fromField(marble2.field)));
                }
              });
            }
          });
        });

      case Card.Four:
        return new Promise<Action>(resolve => {
          gameComp.pickMarble().then(marble => {
            gameComp.pickField().then(field => {
              let action: Action;
              if (!marble.isBase) {
                action = new MoveBackAction(card, FieldID.fromField(marble.field), FieldID.fromField(field));
              }
              resolve(action);
            });
          });
        });

      case Card.Eight:
        return new Promise<Action>(resolve => {
          gameComp.pickMarble().then(marble => {
            gameComp.pickField().then(field => {
              let action: Action;
              if (!marble.isBase) {
                action = new RegularMoveAction(card, FieldID.fromField(marble.field), FieldID.fromField(field));
              }
              resolve(action);
            });
          });
          gameComp.pressButton('Aussetzen lassen').then(() => {
            resolve(new MissAction(card));
          });
        });

      case Card.Jester:
        return new Promise<Action>(resolve => {
          resolve(new JesterAction(card));
        });

      case Card.Angel:
        return new Promise<Action>(resolve => {
          gameComp.pickMarble().then(marble => {
            if (marble.isBase) {
              resolve(new AngelOpenAction(card, marble.base.player));
            } else {
              gameComp.pickField().then(field => {
                resolve(new AngelMoveAction(card, FieldID.fromField(marble.field), FieldID.fromField(field)));
              });
            }
          });
        });

      case Card.Seven:
        return new Promise<Action>(resolve => {
          this.parts = [];
          this.getSevenMovePart(card, gameComp);
          gameComp.pressButton('Fertig').then(() => {
            resolve(new SevenAction(card, this.parts));
          });
        });

      case Card.Devil:
        return new Promise<Action>(resolve => {
          gameComp.pickCardDevil().then(devilcard => {
            this.doAction(devilcard, gameComp).then(action => resolve(new DevilAction(card, action)));
          });
        });

      default:
        return new Promise<Action>((resolve, reject) => {
          gameComp.pickMarble().then(marble => {
            gameComp.pickField().then(field => {
              let action: Action;
              if (!marble.isBase) {
                action = new RegularMoveAction(card, FieldID.fromField(marble.field), FieldID.fromField(field));
              }
              resolve(action);
            });
          });
        });


    }
  }
  private getSevenMovePart(card: Card, gameComp: GameComponent) {
    gameComp.pickMarble().then(marble => {
      gameComp.pickField().then(field => {
        if (!marble.isBase) {
          this.parts.push(new SevenMovePart(card, FieldID.fromField(marble.field), FieldID.fromField(field)));
          this.simulateAction(gameComp, new SevenAction(card, this.parts));
          this.getSevenMovePart(card, gameComp);
        }
      });
    });
  }

  private simulateAction(gameComp: GameComponent, action: Action) {
    this.restService.simulateAction(gameComp.gameName, action, game => gameComp.game = game, () => this.simulateAction(gameComp, action));
  }

}
