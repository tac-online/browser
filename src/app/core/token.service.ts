import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {filter, share} from 'rxjs/operators';

@Injectable()
export class TokenService {

  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  private token: string;

  constructor(private tokenStorage: TokenStorageService) {
    this.publishStoredToken();
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
  }

  isAuthenticated(): boolean {
    console.log('test');
    if (!this.getToken()) return false;
    const dec = JSON.parse(atob(this.getToken().split('.')[1]));
    console.log(dec);
    if (dec) {
      return dec.exp >= new Date();
    }
    return false;
  }

  /**
   * Publishes tokenSubject when it changes.
   * @returns {Observable<NbAuthToken>}
   */
  tokenChange(): Observable<string> {
    return this.tokenSubject
      .pipe(
        filter(value => !!value),
        share(),
      );
  }

  /**
   * Sets a tokenSubject into the storage. This method is used by the NbAuthService automatically.
   *
   * @param {NbAuthToken} tokenSubject
   * @returns {Observable<any>}
   */
  set(token: string): Observable<null> {
    this.tokenStorage.set(token);
    this.publishStoredToken();
    return observableOf(null);
  }

  /**
   * Returns observable of current tokenSubject
   * @returns {Observable<NbAuthToken>}
   */
  get(): Observable<string> {
    const token = this.tokenStorage.get();
    return observableOf(token);
  }

  /**
   * Removes the tokenSubject and published tokenSubject value
   *
   * @returns {Observable<any>}
   */
  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.publishStoredToken();
    return observableOf(null);
  }

  protected publishStoredToken() {
    this.tokenSubject.next(this.tokenStorage.get());
  }
}
