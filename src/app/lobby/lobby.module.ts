import { NgModule } from '@angular/core';
import { TestLobbyComponent } from './test-lobby/test-lobby.component';
import {SharedModule} from '../shared/shared.module';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import {NbSidebarModule, NbLayoutModule, NbButtonModule, NbListModule, NbDialogModule} from '@nebular/theme';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbListModule,
    NbDialogModule.forChild()
  ],
  declarations: [TestLobbyComponent]
})
export class LobbyModule { }
