import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login0',
  templateUrl: './login0.page.html',
  styleUrls: ['./login0.page.scss'],
})
export class Login0Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Método de inicialización vacío. No es necesario agregar código adicional aquí a menos que sea requerido.
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
