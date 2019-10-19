import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TestLobbyComponent} from './lobby/test-lobby/test-lobby.component';
import {GameComponent} from './game/game/game.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TestLobbyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
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
