import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FieldComponent } from './field/field.component';
import { BoardService } from './board.service';
import {MdGridListModule} from '@angular/material';
import { BaseComponent } from './base/base.component';
import { StoneComponent } from './stone/stone.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    MdGridListModule
  ],
  declarations: [BoardComponent, FieldComponent, BaseComponent, StoneComponent, HomeComponent, GameComponent, CardComponent],
  providers: [
    BoardService
  ],
  exports: [
    BoardComponent,
    FieldComponent,
    BaseComponent,
    StoneComponent,
    GameComponent,
    HomeComponent
  ]
})
export class GameModule { }
