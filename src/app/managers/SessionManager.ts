import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionManager {

  private readonly temporaryUserName: string = 'user';
  private readonly temporaryPass: string = 'pass';

  constructor(private router: Router) {}
  performLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}