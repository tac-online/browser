import { NgModule } from '@angular/core';
import { TestLobbyComponent } from './test-lobby/test-lobby.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [TestLobbyComponent]
})
export class LobbyModule { }
