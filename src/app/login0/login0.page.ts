import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login0',
  templateUrl: './login0.page.html',
  styleUrls: ['./login0.page.scss'],
})
export class Login0Page  {

  constructor(private router: Router) { }

  

  onLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
