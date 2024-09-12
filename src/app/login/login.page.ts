import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from '../managers/SessionManager';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string = '';
  password: string = '';

  constructor(private router: Router, private sessionManager: SessionManager, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();

  }

  onLoginButtonPressed() {
    console.log('User:', this.user);
    console.log('Password:', this.password);

    if (this.sessionManager.performLogin(this.user, this.password)) {
      this.storage.set("nombreUsuario", this.user);
      this.router.navigate(['/home']);
    } else {
      this.user = '';
      this.password = '';
      alert('Las credenciales ingresadas son inválidas');
    }
    //guardar informacion en el storage
    this.storage.set("nombreUsuario",'raul')
  }

  onRegisterButtonPressed() {
    this.router.navigate(['/register']);
  }

  


}
