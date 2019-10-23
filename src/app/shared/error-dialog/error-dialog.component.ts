import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomError} from '../../core/model';
import {Subscription} from 'rxjs';
import {ModalService} from '../../core/modal.service';

@Component({
  selector: 'tac-error-dialog',
  templateUrl: 'error-dialog.component.html',
  styleUrls: ['error-dialog.component.css'],
})
export class ErrorDialogComponent implements OnInit, OnDestroy {

  public open: boolean;

  private subscription: Subscription;

  public error: CustomError;

  constructor(private modalService: ModalService) {
  }

  public ngOnInit() {
    this.subscription = this.modalService.error.subscribe(item => this.show(item));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private show(error: CustomError) {
    this.error = error;
    if (error) {
      this.open = true;
    }
  }

  reload() {
    this.dismiss();
    this.error.callback();
  }

  dismiss() {
    this.open = false;
  }
}
