import { Component, OnInit } from '@angular/core';
import { SessionManager } from '../managers/SessionManager';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nombreUsuario: string = ''; // Inicia vacío para cargar el nombre real

  constructor(private sessionManager: SessionManager, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();  // Asegúrate de inicializar Ionic Storage
    this.verStorage(); // Llamar a la función para obtener el nombre del usuario
  }

  // Función para obtener el nombre del usuario desde el almacenamiento
  async verStorage() {
    let nombre = await this.storage.get("nombreUsuario");
    console.log("El nombre guardado es: " + nombre);
    if (nombre) {
      this.nombreUsuario = nombre; // Asignar el nombre recuperado al campo
    } else {
      this.nombreUsuario = 'Invitado'; // Si no hay nombre, asignar 'Invitado'
    }
  }

  // Función para cerrar sesión
  onLogoutButtonPressed() {
    this.sessionManager.performLogout();
  }
}
