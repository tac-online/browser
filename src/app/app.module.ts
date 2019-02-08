import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { NbThemeModule } from '@nebular/theme';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from './routing.module';
import {GameModule} from './game/game.module';
import {LobbyModule} from './lobby/lobby.module';
import {SharedModule} from './shared/shared.module';

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
        })
      ],
      forms: {
        register: {
          strategy: 'email',
          terms: false,
        },
        login: {
          rememberMe: false
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
    NbThemeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
