import { Component } from '@angular/core';
import { RecetasService } from '../service/recetas.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Importa Router
import { SessionManager } from '../managers/SessionManager';

@Component({
  selector: 'app-ingresorecetas',
  templateUrl: './ingresorecetas.page.html',
  styleUrls: ['./ingresorecetas.page.scss'],
})
export class IngresorecetasPage {
  newRecipe = {
    title: '',
    description: '',
    imageUrl: '',
    userId: ''
  };

  constructor(
    private recetasService: RecetasService, // Inyectamos el servicio
    private router: Router, // Inyectamos el servicio Router
    private sessionManager: SessionManager ) {}

  // Método para guardar la receta
  onSubmit() {
    if (this.newRecipe.title && this.newRecipe.description && this.newRecipe.imageUrl) {
      // Obtén el userId del usuario autenticado
      this.sessionManager.getProfile().then((userId) => {
        if (userId) {
          // Añade el userId al objeto de la receta
          const recetaConUsuario = {
            ...this.newRecipe,
            userId: userId, // Asegúrate de que esto se esté configurando correctamente
          };
  
          this.recetasService.addRecipe(recetaConUsuario)
            .then(() => {
              console.log('Receta guardada');
              // Redirigir al home después de guardar
              this.router.navigate(['/home']);
            })
            .catch((error) => {
              console.error('Error al guardar receta: ', error);
            });
        } else {
          console.error('Error: no se pudo obtener el ID del usuario');
        }
      });
    } else {
      console.error('Por favor complete todos los campos');
    }
  }
  

  // Métodos de navegación para tabs
  onHomeButtonPressed() {
    this.router.navigate(['/home']);
  }

  onRecipeButtonPressed() {
    this.router.navigate(['/ingresorecetas']);
  }

  onProfileButtonPressed() {
    this.router.navigate(['/profile']);
  }
}