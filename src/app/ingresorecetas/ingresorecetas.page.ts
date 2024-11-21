import { Component } from '@angular/core';
import { RecetasService } from '../service/recetas.service';  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-ingresorecetas',
  templateUrl: './ingresorecetas.page.html',
  styleUrls: ['./ingresorecetas.page.scss'],
})
export class IngresorecetasPage {  // Este nombre debe coincidir con el nombre de la clase
  newRecipe = {
    title: '',
    description: '',
    imageUrl: ''
  };

  constructor(private recetasService: RecetasService) {}  // Inyectamos el servicio

  onSubmit() {
    if (this.newRecipe.title && this.newRecipe.description && this.newRecipe.imageUrl) {
      this.recetasService.addRecipe(this.newRecipe).then(() => {
        console.log('Receta guardada');
        // Aquí podrías redirigir a otra página, por ejemplo, al home
      }).catch(error => {
        console.error('Error al guardar receta: ', error);
      });
    } else {
      console.error('Por favor complete todos los campos');
    }
  }
}
