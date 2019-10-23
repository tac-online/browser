import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {TokenService} from './core/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {
  }

  canActivate() {
    if (!this.tokenService.isAuthenticated()) {
      this.router.navigate(['auth/login']);
    }
    return true;
  }
}
