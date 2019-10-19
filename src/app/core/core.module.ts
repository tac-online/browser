import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestHelperService} from './rest-helper.service';
import {RestGameService} from './rest-game.service';
import {WebsocketService} from './websocket.service';
import {TokenService} from './token.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    RestHelperService,
    RestGameService,
    WebsocketService,
    TokenService
  ]
})
export class CoreModule { }
