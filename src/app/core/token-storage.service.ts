import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {environment} from '../../environments/environment';

@Injectable()
export class TokenStorageService {

  /**
   * @ignore
   */
  private cookieName = 'tac-auth-token';

  /**
   * @ignore
   */
  constructor(private cookieService: CookieService) {
  }

  set(token: string) {
    this.cookieService.put(this.cookieName, token, {secure: environment.production, httpOnly: true});
  }

  get(): string {
    return this.cookieService.get(this.cookieName);
  }

  clear() {
    this.cookieService.remove(this.cookieName);
  }
}
