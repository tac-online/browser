import {timeout} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ModalError, Status} from './model';
import {TokenService} from './token.service';
import {ModalService} from './modal.service';
import {Router} from '@angular/router';
import {EnvironmentService} from './environment.service';

@Injectable()
export class RestHelperService {

  private baseUrl: string;

  constructor(private http: HttpClient, private tokenService: TokenService, private modalService: ModalService, private router: Router, private environment: EnvironmentService) {
    this.baseUrl = environment.apiUrl;
  }

  public getHeaders(): HttpHeaders {
    if (this.tokenService.isAuthenticated()) {
      return new HttpHeaders().set('Authorization', this.tokenService.getToken());
    } else {
      return new HttpHeaders();
    }
  }

  public get<T>(url: string, success: (resp: T, version: number) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const response = this.http.get<Status<T>>(url, {headers: headers}).pipe(timeout(5000));
    response.subscribe(res => this.handleStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public put<T, U>(url: string, data: U, success: (resp: T, version: number) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const value = this.http.put<Status<T>>(url, data, {headers: headers}).pipe(timeout(5000));
    value.subscribe(res => this.handleStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public post<T, U>(url: string, data: U, success: (resp: T, version: number) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const value = this.http.post<Status<T>>(url, data, {headers: headers}).pipe(timeout(5000));
    value.subscribe(res => this.handleStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public delete<T>(url: string, success: (resp: T, version: number) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const response = this.http.delete<Status<T>>(url, {headers: headers}).pipe(timeout(5000));
    response.subscribe(res => this.handleStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public getOnlyCritical<T>(url: string, success: (resp: Status<T>) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const response = this.http.get<Status<T>>(url, {headers: headers}).pipe(timeout(5000));
    response.subscribe(res => this.handleCriticalStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public putOnlyCritical<T, U>(url: string, data: U, success: (resp: Status<T>) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const value = this.http.put<Status<T>>(url, data, {headers: headers}).pipe(timeout(5000));
    value.subscribe(res => this.handleCriticalStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public postOnlyCritical<T, U>(url: string, data: U, success: (resp: Status<T>) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const value = this.http.post<Status<T>>(url, data, {headers: headers}).pipe(timeout(5000));
    value.subscribe(res => this.handleCriticalStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public deleteOnlyCritical<T>(url: string, success: (resp: Status<T>) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()) {
    const response = this.http.delete<Status<T>>(url, {headers: headers}).pipe(timeout(5000));
    response.subscribe(res => this.handleCriticalStatus(res, success, reload), error => this.handleError(error, reload));
  }

  public getGameServiceURL(): string {
    return 'https://game-server.' + this.baseUrl;
  }

  public getAuthServiceURL(): string {
    return 'https://auth-service.' + this.baseUrl;
  }

  private handleStatus<T>(status: Status<T>, success: (resp: T, version: number) => void, reload: () => void) {
    if (status.error) {
      if (status.message === 'UNAUTHORIZED') {
        this.router.navigate(['auth/login']);
      } else if (status.message === 'TOKEN_EXPIRED') {
        console.log('token expired');
      }
      const error = new ModalError(status.message, reload);
      this.modalService.showError(error);
    } else {
      success(status.value, status.version);
    }
  }

  private handleCriticalStatus<T>(status: Status<T>, success: (resp: Status<T>) => void, reload: () => void) {
    if (status.error) {
      if (status.critical) {
        const error = new ModalError(status.message, reload);
        this.modalService.showError(error);
      } else {
        success(status);
      }
    } else {
      success(status);
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
    let error2: ModalError;
    if (error.name === 'TimeoutError' || error.status === 0) {
      error2 = new ModalError('TimeoutError', reload);
    } else if (error.status) {
      error2 = new ModalError(error.status, reload);
    } else {
      error2 = new ModalError(error.message, reload);
    }
    this.modalService.showError(error2);
  }
}
