import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {CustomError} from './model';

/**
 * Provides modal functionality
 */
@Injectable()
export class ModalService {

  /**
   * @ignore
   */
  private _errorString = new BehaviorSubject<CustomError>(null);

  /**
   * An Observable to which a modal can subscribe to always receive the newest error
   */
  public error = this._errorString.asObservable();

  /**
   * Show an error message
   *
   * @param error the error
   */
  public showError(error: CustomError) {
    this._errorString.next(error);
  }
}
