import { Component } from '@angular/core';
import { RecetasService } from '../service/recetas.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-ingresorecetas',
  templateUrl: './ingresorecetas.page.html',
  styleUrls: ['./ingresorecetas.page.scss'],
})
export class IngresorecetasPage {
  newRecipe = {
    title: '',
    description: '',
    imageUrl: ''
  };

  constructor(
    private recetasService: RecetasService, // Inyectamos el servicio
    private router: Router // Inyectamos el servicio Router
  ) {}

  // Método para guardar la receta
  onSubmit() {
    if (this.newRecipe.title && this.newRecipe.description && this.newRecipe.imageUrl) {
      this.recetasService
        .addRecipe(this.newRecipe)
        .then(() => {
          console.log('Receta guardada');
          // Redirigir al home después de guardar
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.error('Error al guardar receta: ', error);
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