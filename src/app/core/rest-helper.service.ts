import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
import {CustomError} from './model';

@Injectable()
export class RestHelperService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/tac-server/webapi/';
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders();
  }

  public getCustomError<T>(url: string, success: (resp: T) => void, handleError: (error: any) => void, headers: HttpHeaders = this.getHeaders(), timeout: number = 5000): Observable<T> {
    const response = this.http.get<T>(url, {headers: headers}).timeout(timeout);
    response.subscribe(res => success(res), error => handleError(error));
    return response;
  }

  public get<T>(url: string, success: (resp: T) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    const handle = (error: any) => this.handleError(error, reload);
    return this.getCustomError(url, success, handle, headers);
  }

  public putCustomError<T, U>(url: string, data: U, success: (resp: T) => void, handleError: (error: any) => void, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    const value = this.http.put<T>(url, data, {headers: headers}).timeout(5000);
    value.subscribe(res => success(res), error => handleError(error));
    return value;
  }

  public put<T, U>(url: string, data: U, success: (resp: T) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    const handle = (error: any) => this.handleError(error, reload);
    return this.putCustomError(url, data, success, handle, headers);
  }

  public postCustomError<T, U>(url: string, data: U, success: (resp: T) => void, handleError: (error: any) => void, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    const value = this.http.post<T>(url, data, {headers: headers}).timeout(5000);
    value.subscribe(res => success(res), error => handleError(error));
    return value;
  }

  public post<T, U>(url: string, data: U, success: (resp: T) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    const handle = (error: any) => this.handleError(error, reload);
    return this.postCustomError(url, data, success, handle, headers);
  }

  public deleteCustomError<T>(url: string, success: (resp: T) => void, handleError: (error: any) => void, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    const response = this.http.delete<T>(url, {headers: headers}).timeout(5000);
    response.subscribe(res => success(res), error => handleError(error));
    return response;
  }

  public delete<T>(url: string, success: (resp: T) => void, reload: () => void, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    const handle = (error: any) => this.handleError(error, reload);
    return this.deleteCustomError(url, success, handle, headers);
  }

  public getGameURL(): string {
    return this.baseUrl + 'game';
  }

  /**
   * Responds to an error occured during a request
   *
   * @param error the error returned by the request
   * @param reload this function is called to retry the operation
   */
  public handleError(error: any, reload: () => void) {
    console.log(error);
    // ticket timed-out, request a new one from CAS-server
    if (error.status && error.status === 408) {
      window.location.href = 'https://sso.hrz.tu-darmstadt.de/login?service=' + window.location.href.split('?')[0];
      return;
    }
    let error2: CustomError;
    if (error.name === 'TimeoutError' || error.status === 0) {
      error2 = new CustomError('TimeoutError', reload, true);
    } else if (error.status) {
      error2 = new CustomError(error.status, reload, true);
    } else {
      error2 = new CustomError(error.message, reload, false);
    }
    // this.modalService.show(error2);
  }

}
