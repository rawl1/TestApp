// home.ts
import { Component, OnInit } from '@angular/core';
import { SessionManager } from '../managers/SessionManager';
import { Storage } from '@ionic/storage-angular';
import { RecetasService } from '../service/recetas.service';
import { Router } from '@angular/router';
import { UserLogoutUseCase } from '../use-cases/user-logout.use-case';
import { CancelAlertService } from '../managers/CancelAlertService';
import firebase from 'firebase/compat/app'; 
import { Geolocation } from '@capacitor/geolocation';// Importar para usar el tipo User
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombreUsuario: string = '';
  recetas: any[] = [];
  userId: string = '';
  userLocation:string = 'ubicacion NO disponible'

  constructor(
    private sessionManager: SessionManager,
    private storage: Storage,
    private recetasService: RecetasService,
    private router: Router,
    private cancelAlertService: CancelAlertService,
    private logoutUseCase: UserLogoutUseCase,
    private http : HttpClient
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.verStorage();
    await this.obtenerUserId();
    this.cargarRecetas(); 
    this.obtenerUbicacion();
  }
  async obtenerUbicacion() {
    try {
      // Solicitar permisos de ubicación
      const permissionResult = await Geolocation.checkPermissions();
      
      if (permissionResult.location !== 'granted') {
        const requestResult = await Geolocation.requestPermissions();
        if (requestResult.location !== 'granted') {
          this.userLocation = 'Permisos denegados';
          return;
        }
      }

      // Obtener la ubicación actual
      const coordinates = await Geolocation.getCurrentPosition();
      
      // Usar servicio de geocodificación inversa (OpenStreetMap)
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&zoom=10&addressdetails=1`;
      
      this.http.get(url).subscribe((response: any) => {
        if (response.address) {
          // Extraer la ciudad o localidad
          const city = response.address.city || 
                       response.address.town || 
                       response.address.village || 
                       'Ubicación no identificada';
          this.userLocation = city;
        }
      });
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
      this.userLocation = 'Error al obtener ubicación';
    }
  }

  async verStorage() {
    let nombre = await this.storage.get('nombreUsuario');
    console.log('El nombre guardado es: ' + nombre);
    this.nombreUsuario = nombre ? nombre : 'Invitado';
  }

  async obtenerUserId() {
    const usuario: firebase.User | null = await this.sessionManager.getProfile();
    this.userId = usuario?.uid || ''; 
  }

  async onSignOutButtonPressed() {
    this.cancelAlertService.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.logoutUseCase.performLogout();
        this.router.navigate(['/login0']);
      },
      () => {}
    );
  }

  // Método para cargar recetas desde el servicio
  cargarRecetas() {
    if (!this.userId) {
      console.error('No se encontró un usuario autenticado');
      return;
    }

    // Obtener recetas de Firestore por el ID del usuario autenticado
    this.recetasService.getRecipesByUser(this.userId).subscribe((data) => {
      this.recetas = data; // Guardar las recetas en el array
      console.log('Recetas cargadas: ', this.recetas);
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

  // Apartado de navegación del tab
  onRecipeButtonPressed() {
    this.router.navigate(['/ingresorecetas']);
  }

  onProfileButtonPressed() {
    this.router.navigate(['/profile']);
  }

  ondetailButtonPressed() {
    this.router.navigate(['/detalle-receta']);
  }
}
