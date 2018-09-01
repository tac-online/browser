import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CustomError } from './model';

/**
 * @ngModule CoreModule
 * @description Provides modal functionality
 */
@Injectable()
export class ModalService {

  private _errorString = new BehaviorSubject<CustomError>(null);

  public error = this._errorString.asObservable();

  public show(error: CustomError) {
    this._errorString.next(error);
  }
}
