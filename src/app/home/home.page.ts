import { Component, OnInit } from '@angular/core';
import { SessionManager } from '../managers/SessionManager';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nombreUsuario: string = '';

  constructor(private sessionManager: SessionManager, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create(); 
    this.verStorage();
  }

 
  async verStorage() {
    let nombre = await this.storage.get("nombreUsuario");
    console.log("El nombre guardado es: " + nombre);
    if (nombre) {
      this.nombreUsuario = nombre; 
    } else {
      this.nombreUsuario = 'Invitado';
    }
  }


  onLogoutButtonPressed() {
    this.sessionManager.performLogout();
  }
}
