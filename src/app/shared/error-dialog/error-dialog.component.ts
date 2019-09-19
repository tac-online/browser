import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {CustomError} from '../../core/model';

@Component({
  selector: 'tac-error-dialog',
  templateUrl: 'error-dialog.component.html',
  styleUrls: ['error-dialog.component.css'],
})
export class ErrorDialogComponent {

  @Input() error: CustomError;

  constructor(protected ref: NbDialogRef<ErrorDialogComponent>) {}

  reload() {
    this.dismiss();
    this.error.callback();
  }

  dismiss() {
    this.ref.close();
  }
}
