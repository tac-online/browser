import {Component} from '@angular/core';
import {Login, Status} from '../../core/model';
import {RestAuthService} from '../../core/rest-auth.service';
import {TokenService} from '../../core/token.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user = new Login('', '');
  authError = false;

  constructor(private restAuthService: RestAuthService, private tokenService: TokenService, private router: Router) {}

  public login() {
    this.authError = false;
    this.restAuthService.login(this.user, resp => this.acceptResponse(resp), () => this.login());
  }

  private acceptResponse(resp: Status<string>) {
    if (resp.error) {
      if (resp.message === 'AUTHENTICATION_ERROR') {
        this.authError = true;
      }
    } else {
      this.tokenService.setToken(resp.value);
      this.router.navigate(['/']);
    }
  }

  public allFilled(): boolean {
    return this.user.username.trim().length > 0 && this.user.password.trim().length > 0;
  }
}
