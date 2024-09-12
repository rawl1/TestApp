import { Component, OnInit } from '@angular/core';
import { SessionManager } from '../managers/SessionManager';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nombreUsuario: string = 'Raul';

  constructor(private sessionManager: SessionManager,private storage: Storage) { }

  async ngOnInit() {
    this.verStorage();
  }

  async verStorage() {
    let nombre= await this.storage.get("nombreUsuario");
    console.log("el nombre guardado es:"+ nombre)
  }

  onLogoutButtonPressed() {
    this.sessionManager.performLogout();
  }
}


