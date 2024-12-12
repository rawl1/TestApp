import { Component } from '@angular/core';
import { RecetasService } from '../service/recetas.service';
import { Router } from '@angular/router';
import { SessionManager } from '../managers/SessionManager';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ingresorecetas',
  templateUrl: './ingresorecetas.page.html',
  styleUrls: ['./ingresorecetas.page.scss'],
})
export class IngresorecetasPage {
  receta = {
    nombre: '',
    ingredientes: '',
    preparacion: '',
    imagen: '',
    descripcion: '',
  };

  constructor(
    private recetasService: RecetasService,
    private router: Router,
    private sessionManager: SessionManager,
    private platform: Platform
  ) {}

  // Método para guardar la receta
  agregarReceta() {
    this.recetasService
      .agregarReceta(this.receta)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error al agregar la receta: ', error);
      });
  }

  // Nuevo método para mostrar Action Sheet
  async seleccionarImagen() {
    try {
      const result = await ActionSheet.showActions({
        title: 'Seleccionar Imagen',
        message: 'Elige una opción para la imagen de tu receta',
        options: [
          {
            title: 'Tomar Foto',
            icon: 'camera'
          },
          {
            title: 'Elegir de Galería',
            icon: 'image'
          },
          {
            title: 'Cancelar',
            style: ActionSheetButtonStyle.Destructive,
            icon: 'close'
          }
        ]
      });

      // Manejar la selección
      switch(result.index) {
        case 0:
          // Tomar foto con la cámara
          await this.tomarFoto(CameraSource.Camera);
          break;
        case 1:
          // Seleccionar de la galería
          await this.tomarFoto(CameraSource.Photos);
          break;
        case 2:
          // Cancelar
          break;
      }
    } catch (error) {
      console.error('Error al mostrar Action Sheet', error);
    }
  }

  // Método modificado para tomar foto
  async tomarFoto(source: CameraSource) {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: source,
        quality: 90,
        saveToGallery: false, // Opcional
      });

      // Convertir a formato base64 o URL de datos
      this.receta.imagen = `data:image/jpeg;base64,${photo.base64String}`;
    } catch (error) {
      console.error('Error al tomar foto: ', error);
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