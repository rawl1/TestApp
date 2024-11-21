import { Component, OnInit } from '@angular/core';
import { SessionManager } from '../managers/SessionManager';
import { Storage } from '@ionic/storage-angular';
import { RecetasService } from '../service/recetas.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombreUsuario: string = '';
  recetas: any[] = []; // Array para almacenar las recetas dinámicas

  constructor(
    private sessionManager: SessionManager,
    private storage: Storage,
    private recetasService: RecetasService // Inyectar el servicio
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.verStorage();
    this.cargarRecetas(); // Cargar las recetas dinámicas
  }

  async verStorage() {
    let nombre = await this.storage.get('nombreUsuario');
    console.log('El nombre guardado es: ' + nombre);
    this.nombreUsuario = nombre ? nombre : 'Invitado';
  }

  onLogoutButtonPressed() {
    this.sessionManager.performLogout();
  }

  // Método para cargar recetas desde el servicio
  cargarRecetas() {
    this.recetasService.getRecipes().subscribe((data) => {
      this.recetas = data; // Guardar las recetas en el array
    });
  }
}
