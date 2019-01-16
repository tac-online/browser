import { Injectable } from '@angular/core';
import {GameComponent} from './game/game.component';
import {Card} from '../core/model.card';
import {FieldID} from '../core/model.game';
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
              const srcID = FieldID.fromField(marble.field);
              srcID.player = marble.field.occupier.owner;
              resolve(new WarriorAction(card, srcID));
            }
          });
        });

      case Card.Trickster:
        return new Promise<Action>(resolve => {
          gameComp.pickMarble().then(marble => {
            if (!marble.isBase) {
              gameComp.pickMarble().then(marble2 => {
                if (!marble2.isBase) {
                  const srcID = FieldID.fromField(marble.field);
                  srcID.player = marble.field.occupier.owner;
                  const destID = FieldID.fromField(marble2.field);
                  destID.player = marble2.field.occupier.owner;
                  resolve(new TricksterAction(card, srcID, destID));
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
                const srcID = FieldID.fromField(marble.field);
                srcID.player = marble.field.occupier.owner;
                const destID = FieldID.fromField(field);
                destID.player = marble.field.occupier.owner;
                action = new MoveBackAction(card, srcID, destID);
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
                const srcID = FieldID.fromField(marble.field);
                srcID.player = marble.field.occupier.owner;
                const destID = FieldID.fromField(field);
                destID.player = marble.field.occupier.owner;
                action = new RegularMoveAction(card, srcID, destID);
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
                const srcID = FieldID.fromField(marble.field);
                srcID.player = marble.field.occupier.owner;
                const destID = FieldID.fromField(field);
                destID.player = marble.field.occupier.owner;
                resolve(new AngelMoveAction(card, srcID, destID));
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
        if (gameComp.game.devilPlayed) {
          return new Promise<Action>(resolve => {
            this.doAction(gameComp.game.devilCard, gameComp).then(action => resolve(new DevilAction(card, action)));
          });
        } else {
          return new Promise<Action>(resolve => {
            gameComp.pickCardDevil().then(devilcard => {
              this.restService.doAction(gameComp.gameName, new DevilCardAction(card, devilcard), () => {}, () => {
                this.doAction(card, gameComp);
              });
            });
          });
        }

      default:
        return new Promise<Action>((resolve, reject) => {
          gameComp.pickMarble().then(marble => {
            gameComp.pickField().then(field => {
              let action: Action;
              if (!marble.isBase) {
                const srcID = FieldID.fromField(marble.field);
                srcID.player = marble.field.occupier.owner;
                const destID = FieldID.fromField(field);
                destID.player = marble.field.occupier.owner;
                action = new RegularMoveAction(card, srcID, destID);
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
