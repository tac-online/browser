import {Injectable} from '@angular/core';
import {NbAuthService, NbAuthToken} from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private authService: NbAuthService) {
    this.authService.getToken().subscribe(token => this.token = token);
    this.authService.onTokenChange().subscribe(token => this.token = token);
  }

  private token: NbAuthToken;

  public loggedIn(): boolean {
    return this.token !== undefined;
  }

  public getToken(): NbAuthToken {
    return this.token;
  }

  public setToken(token: NbAuthToken) {
    this.token = token;
  }
}
