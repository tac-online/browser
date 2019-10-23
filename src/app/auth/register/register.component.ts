import {Component} from '@angular/core';
import {Login, Status} from '../../core/model';
import {RestAuthService} from '../../core/rest-auth.service';
import {TokenService} from '../../core/token.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user = new Login('', '');
  repeatPassword = '';
  authError = false;

  constructor(private restAuthService: RestAuthService, private tokenService: TokenService, private router: Router) {}

  public register() {
    this.authError = false;
    this.user['email'] = '';
    this.restAuthService.register(this.user, resp => this.acceptResponse(resp), () => this.register());
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
    return this.user.username.trim().length > 0 && this.user.password.trim().length > 0 && this.repeatPassword.trim().length > 0;
  }
}
