import { Injectable } from '@angular/core';
import {Login} from './model';
import {RestHelperService} from './rest-helper.service';

@Injectable({
  providedIn: 'root'
})
export class RestAuthService {

  constructor(private rest: RestHelperService) { }

  public login(user: Login, success: (resp: string) => void, reload: () => void) {
    this.rest.post(this.rest.getAuthServiceURL() + 'login/', user, success, reload);
  }
}
