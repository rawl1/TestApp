import { Component, OnInit } from '@angular/core';
import { SessionManager } from '../managers/SessionManager';
import { Storage } from '@ionic/storage-angular';
import { RecetasService } from '../service/recetas.service';
import { Router } from '@angular/router';
import { UserLogoutUseCase } from '../use-cases/user-logout.use-case';
import { CancelAlertService } from '../managers/CancelAlertService';

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
    private recetasService: RecetasService, // Inyectar el servicio
    private router: Router, // Usa esta instancia del enrutador
    private cancelAlertService: CancelAlertService,
    private logoutUseCase: UserLogoutUseCase,
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

  async onSignOutButtonPressed() {
    this.cancelAlertService.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.logoutUseCase.performLogout();
        this.router.navigate(['/splash']);
      },
      () => { }
    );
  }

  // Método para cargar recetas desde el servicio
  cargarRecetas() {
    this.recetasService.getRecipes().subscribe((data) => {
      this.recetas = data; // Guardar las recetas en el array
    });
  }

  // Método para eliminar una receta
  eliminarReceta(id: string) {
    this.recetasService.deleteRecipe(id).then(() => {
      console.log('Receta eliminada');
      this.cargarRecetas(); // Recarga la lista de recetas después de eliminar
    }).catch((error) => {
      console.error('Error al eliminar la receta:', error);
    });
  }


  // Apartado de navegacion del tab
  onRecipeButtonPressed() {
    this.router.navigate(['/ingresorecetas']); // Usa la instancia inyectada del enrutador
  }

  onProfileButtonPressed() {
    this.router.navigate(['/profile']); // Usa la instancia inyectada del enrutador
  }

  ondetailButtonPressed(){
    this.router.navigate(['/detalle-receta'])
  }
}