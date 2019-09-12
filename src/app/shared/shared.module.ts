import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import {ModalModule} from 'ngx-bootstrap';
import { MatchValueDirective } from './match-value.directive';
import {NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule} from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule
  ],
  declarations: [ErrorModalComponent, MatchValueDirective],
  exports : [
    CommonModule,
    FormsModule,
    ModalModule,
    ErrorModalComponent,
    MatchValueDirective,
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule
  ]
})
export class SharedModule { }
