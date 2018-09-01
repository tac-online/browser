import { NgModule } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { FieldComponent } from './field/field.component';
import { BoardService } from './board.service';
import { BaseComponent } from './base/base.component';
import { StoneComponent } from './stone/stone.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { CardComponent } from './card/card.component';
import {ActionService} from './action.service';
import {SharedModule} from '../shared/shared.module';
import { ImagemapComponent } from './imagemap/imagemap.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [BoardComponent, FieldComponent, BaseComponent, StoneComponent, HomeComponent, GameComponent, CardComponent, ImagemapComponent],
  providers: [
    BoardService,
    ActionService
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
