import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from './routing.module';
import {GameModule} from './game/game.module';
import {LobbyModule} from './lobby/lobby.module';
import {SharedModule} from './shared/shared.module';
import {AuthGuard} from './auth.guard';
import {CookieModule} from 'ngx-cookie';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    CoreModule,
    CookieModule.forRoot(),
    HttpClientModule,
    RoutingModule,
    GameModule,
    LobbyModule,
    SharedModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
