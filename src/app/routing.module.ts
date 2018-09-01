import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TestLobbyComponent} from './lobby/test-lobby/test-lobby.component';
import {GameComponent} from './game/game/game.component';

const routes: Routes = [
  {
    path: '',
    component: TestLobbyComponent
  },
  {
    path: 'game',
    component: GameComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
