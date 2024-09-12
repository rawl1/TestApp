import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionManager {

  private readonly temporaryUserName: string = 'user';
  private readonly temporaryPass: string = 'pass';

  constructor(private router: Router) {}

  performLogin(user: string, password: string): boolean {
    if (user === this.temporaryUserName && password === this.temporaryPass) {
      return true;
    } else {
      return false;
    }
  }

  performLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

