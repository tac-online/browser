import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestHelperService} from './rest-helper.service';
import {RestGameService} from './rest-game.service';
import {WebsocketService} from './websocket.service';
import {TokenService} from './token.service';
import {ModalService} from './modal.service';
import {TokenStorageService} from './token-storage.service';
import {GameStateService} from './game-state.service';
import {DragDropService} from './drag-drop.service';
import {ActionService} from './action.service';
import {ScaleService} from './scale.service';
import {TurnStateService} from './turn-state.service';
import {EnvironmentServiceProvider} from './environment.service.provider';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    RestHelperService,
    RestGameService,
    WebsocketService,
    TokenService,
    ModalService,
    TokenStorageService,
    GameStateService,
    DragDropService,
    ActionService,
    ScaleService,
    TurnStateService,
    EnvironmentServiceProvider
  ]
})
export class CoreModule { }
