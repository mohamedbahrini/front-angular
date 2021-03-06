import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }

  saveToken(token: string) {
    let date = new Date();
    const days = 1;
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `token=${token}; expires=${date.toUTCString}; path=/`;
  }

  getToken(): string {
    const token = 'token';
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(token + '=');
      if (c_start !== -1) {
        c_start = c_start + token.length + 1;
        let c_end = document.cookie.indexOf(';', c_start);
        if (c_end === -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return '';
  }

  isAuthenticated(): boolean {
    return !(!this.getToken() || 0 === this.getToken().length);
  }

  logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.router.navigate(['/login']);
  }
}
