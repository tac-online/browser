import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken} from '@nebular/auth';
import {NbLayoutModule, NbThemeModule} from '@nebular/theme';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from './routing.module';
import {GameModule} from './game/game.module';
import {LobbyModule} from './lobby/lobby.module';
import {SharedModule} from './shared/shared.module';
import {NbEvaIconsModule} from '@nebular/eva-icons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    RoutingModule,
    GameModule,
    LobbyModule,
    SharedModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'https://tac-auth.johannes-wirth.de/',
          login: {
            redirect: {
              success: '/',
            },
            defaultErrors: ['Username/Password combination is not correct, please try again.'],
          },
          register: {
            redirect: {
              success: '/auth',
            },
          },
          resetPass: {
            endpoint: 'change-pass',
            method: 'post'
          },
          token: {
            class: NbAuthJWTToken,

            key: 'value', // this parameter tells where to look for the token
          }
        })
      ],
      forms: {
        register: {
          redirectDelay: 1000
        },
        login: {
          redirectDelay: 1000
        },
        validation: {
          password: {
            required: true,
            minLength: 8,
            maxLength: 100,
          },
        }
      }
    }),
    NbThemeModule.forRoot(),
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
