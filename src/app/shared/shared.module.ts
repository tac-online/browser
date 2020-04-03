import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatchValueDirective } from './match-value.directive';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import {
  ClrButtonModule,
  ClrModalModule,
  ClrInputModule,
  ClrCheckboxModule,
  ClrPasswordModule,
  ClrSignpostModule
} from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClrModalModule,
    ClrButtonModule,
    ClrInputModule,
    ClrCheckboxModule,
    ClrPasswordModule
  ],
  declarations: [MatchValueDirective, ErrorDialogComponent],
  exports : [
    CommonModule,
    FormsModule,
    MatchValueDirective,
    ErrorDialogComponent,
    ClrButtonModule,
    ClrInputModule,
    ClrCheckboxModule,
    ClrPasswordModule,
    ClrModalModule,
    ClrSignpostModule
  ]
})
export class SharedModule { }
