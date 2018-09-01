import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  declarations: [ErrorModalComponent],
  exports : [
    CommonModule,
    FormsModule,
    ModalModule,
    ErrorModalComponent
  ]
})
export class SharedModule { }
