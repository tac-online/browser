import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatchValueDirective } from './match-value.directive';
import {NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbLayoutModule} from '@nebular/theme';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbDialogModule.forChild()
  ],
  declarations: [MatchValueDirective, ErrorDialogComponent],
  exports : [
    CommonModule,
    FormsModule,
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
