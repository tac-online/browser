import { NgModule } from '@angular/core';
import { BoardService } from './board.service';
import { GameComponent } from './game/game.component';
import { CardComponent } from './card/card.component';
import {ActionService} from './action.service';
import {SharedModule} from '../shared/shared.module';
import { ImagemapComponent } from './imagemap/imagemap.component';
import {NbBadgeModule, NbDialogModule} from '@nebular/theme';
import { PlayerComponent } from './player/player.component';

@NgModule({
  imports: [
    SharedModule,
    NbDialogModule.forChild(),
    NbBadgeModule
  ],
  declarations: [GameComponent, CardComponent, ImagemapComponent, PlayerComponent],
  providers: [
    BoardService,
    ActionService
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
