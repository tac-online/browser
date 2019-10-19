import {Injectable} from '@angular/core';
import {NbAuthToken, NbAuthTokenParceler, NbTokenStorage} from '@nebular/auth';
import {CookieService} from 'ngx-cookie';
import {environment} from '../environments/environment';

@Injectable()
export class TokenCookieStorageService extends NbTokenStorage {


  protected key = 'auth_app_token';

  constructor(private parceler: NbAuthTokenParceler, private cookieService: CookieService) {
    super();
  }

  /**
   * Returns token from cookie
   * @returns {NbAuthToken}
   */
  get(): NbAuthToken {
    const raw = this.cookieService.get('authtoken');
    return this.parceler.unwrap(raw);
  }

  /**
   * Sets token to localStorage
   * @param {NbAuthToken} token
   */
  set(token: NbAuthToken) {
    const raw = this.parceler.wrap(token);
    this.cookieService.put('authtoken', raw, {secure: environment.production, httpOnly: true});
  }

  /**
   * Clears token from localStorage
   */
  clear() {
    this.cookieService.remove('authtoken');
  }
}
