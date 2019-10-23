import {Injectable} from '@angular/core';
import {TokenStorageService} from './token-storage.service';

@Injectable()
export class TokenService {

  private token: string;

  constructor(private tokenStorage: TokenStorageService) {}

  public getToken(): string {
    if (!this.token) {
      this.token = this.tokenStorage.get();
    }
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
    this.tokenStorage.set(token);
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  clear() {
    this.tokenStorage.clear();
    this.token = null;
  }
}
