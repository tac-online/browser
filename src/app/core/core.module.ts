import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestHelperService} from './rest-helper.service';
import {RestGameService} from './rest-game.service';
import {WebsocketService} from './websocket.service';
import {TokenService} from './token.service';
import {ModalService} from './modal.service';
import {TokenStorageService} from './token-storage.service';

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
    TokenStorageService
  ]
})
export class CoreModule { }
