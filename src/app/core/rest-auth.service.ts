import { Injectable } from '@angular/core';
import {Login, Status} from './model';
import {RestHelperService} from './rest-helper.service';

@Injectable({
  providedIn: 'root'
})
export class RestAuthService {

  constructor(private rest: RestHelperService) { }

  public login(user: Login, success: (resp: Status<string>) => void, reload: () => void) {
    this.rest.postOnlyCritical(this.rest.getAuthServiceURL() + 'login/', user, success, reload);
  }

  public register(user: Login, success: (resp: Status<string>) => void, reload: () => void) {
    this.rest.postOnlyCritical(this.rest.getAuthServiceURL() + 'register/', user, success, reload);
  }
}
