import {Component} from '@angular/core';
import {Login} from '../../core/model';
import {RestAuthService} from '../../core/rest-auth.service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: Login;

  constructor(private restAuthService: RestAuthService) {}

  public login() {
    this.restAuthService.login(this.user, resp => this.acceptResponse(resp), () => this.login());
  }

  private acceptResponse(resp: string) {
    
  }
}
