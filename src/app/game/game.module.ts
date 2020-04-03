import { NgModule } from '@angular/core';
import { BoardService } from './board.service';
import { GameComponent } from './game/game.component';
import { CardComponent } from './card/card.component';
import {SharedModule} from '../shared/shared.module';
import { ImagemapComponent } from './imagemap/imagemap.component';
import { PlayerComponent } from './player/player.component';
import { BoardComponent } from './board/board.component';
import { CardstackComponent } from './cardstack/cardstack.component';
import { BaseComponent } from './base/base.component';
import { FieldComponent } from './field/field.component';
import { PositionedDirective } from './positioned.directive';
import { MarbleComponent } from './marble/marble.component';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [GameComponent, CardComponent, ImagemapComponent, PlayerComponent, BoardComponent, CardstackComponent, BaseComponent, FieldComponent, PositionedDirective, MarbleComponent, DraggableDirective],
  providers: [
    BoardService
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
