import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalError} from '../../core/model';
import {Subscription} from 'rxjs';
import {ModalService} from '../../core/modal.service';

@Component({
  selector: 'tac-error-dialog',
  templateUrl: 'error-dialog.component.html',
  styleUrls: ['error-dialog.component.css'],
})
export class ErrorDialogComponent implements OnInit, OnDestroy {

  public open = false;

  private subscription: Subscription;

  public error: ModalError;

  constructor(private modalService: ModalService) {
  }

  public ngOnInit() {
    this.subscription = this.modalService.error.subscribe(item => this.show(item));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private show(error: ModalError) {
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
