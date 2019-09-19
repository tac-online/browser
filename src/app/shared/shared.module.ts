import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import {ModalModule} from 'ngx-bootstrap';
import { MatchValueDirective } from './match-value.directive';
import {NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbLayoutModule} from '@nebular/theme';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbDialogModule.forChild()
  ],
  declarations: [ErrorModalComponent, MatchValueDirective, ErrorDialogComponent],
  exports : [
    CommonModule,
    FormsModule,
    ModalModule,
    ErrorModalComponent,
    MatchValueDirective,
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    ErrorDialogComponent
  ],
  entryComponents: [
    ErrorDialogComponent
  ]
})
export class SharedModule { }
