import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestHelperService} from './rest-helper.service';
import {RestGameService} from './rest-game.service';
import {WebsocketService} from './websocket.service';
import {ModalService} from './modal.service';
import {TokenService} from './token.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    RestHelperService,
    RestGameService,
    WebsocketService,
    ModalService,
    TokenService
  ]
})
export class CoreModule { }
