
import {timeout} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomError, Status, Version} from './model';
import {ModalService} from './modal.service';
import {NbAuthService} from '@nebular/auth';
import {TokenService} from './token.service';

@Injectable()
export class RestHelperService {

  private baseUrl: string;

  constructor(private http: HttpClient, private modalService: ModalService, private tokenService: TokenService) {
    this.baseUrl = 'johannes-wirth.de/';
  }

  public getHeaders(): HttpHeaders {
    if (this.tokenService.loggedIn()) {
      return new HttpHeaders().set('Authorization', this.tokenService.getToken().getValue());
    } else {
      return new HttpHeaders();
    }
  }

  public get<T>(url: string, success: (resp: T) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const response = this.http.get<Status<T>>(url, {headers: headers}).pipe(timeout(5000));
    response.subscribe(res => this.handleStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public put<T, U>(url: string, data: U, success: (resp: T) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const value = this.http.put<Status<T>>(url, data, {headers: headers}).pipe(timeout(5000));
    value.subscribe(res => this.handleStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public post<T, U>(url: string, data: U, success: (resp: T) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const value = this.http.post<Status<T>>(url, data, {headers: headers}).pipe(timeout(5000));
    value.subscribe(res => this.handleStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public delete<T>(url: string, success: (resp: T) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const response = this.http.delete<Status<T>>(url, {headers: headers}).pipe(timeout(5000));
    response.subscribe(res => this.handleStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public getInterfaceVersion(success: (resp: Version) => void, reload: () => void) {
    const url = this.baseUrl + 'version';
    this.get(url, success, reload, new HttpHeaders());
  }

  public getGameURL(): string {
    return this.baseUrl + 'game/';
  }

  public getGameServiceURL(): string {
    return "https://tac-game-service." + this.baseUrl + "games/";
  }

  private handleStatus<T>(status: Status<T>, success: (resp: T) => void, reload: () => void) {
    if (status.error) {
      this.modalService.show(new CustomError(status.message, reload, status.message !== 'MOVE_NOT_ALLOWED'));
      if (status.message === 'MOVE_NOT_ALLOWED') reload();
    } else {
      success(status.value);
    }
  }

  /**
   * Responds to an error occured during a request
   *
   * @param error the error returned by the request
   * @param reload this function is called to retry the operation
   */
  public handleError(error: any, reload: () => void) {
    console.log(error);
    let error2: CustomError;
    if (error.name === 'TimeoutError' || error.status === 0) {
      error2 = new CustomError('TimeoutError', reload, true);
    } else if (error.status) {
      error2 = new CustomError(error.status, reload, true);
    } else {
      error2 = new CustomError(error.message, reload, false);
    }
    this.modalService.show(error2);
  }
}
