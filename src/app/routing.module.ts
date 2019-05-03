import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

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
  },
  {
    path: 'account',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'change-password',
        component: NbResetPasswordComponent,
      },
    ],
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
