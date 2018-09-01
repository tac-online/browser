import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';

import { CustomError } from '../../core/model';

import { ModalService } from '../../core/modal.service';

@Component({
  selector: 'error-modal',
  templateUrl: './error-modal.component.html'
})
export class ErrorModalComponent implements OnInit, OnDestroy {

  @ViewChild(ModalDirective) public connErrorModal: ModalDirective;

  private subscription: Subscription;

  public error: CustomError;

  constructor(private modalService: ModalService) {}

  public ngOnInit() {
    this.subscription = this.modalService.error.subscribe(item => this.show(item));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private show(error: CustomError) {
    this.error = error;
    if (error) {
      this.connErrorModal.show();
    }
  }

  public reload() {
    this.hide();
    this.error.callback();
  }

  public hide() {
    this.connErrorModal.hide();
  }

}
