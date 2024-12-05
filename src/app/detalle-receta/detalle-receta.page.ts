import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
})
export class DetalleRecetaPage implements OnInit {
  receta: any; // Objeto para almacenar los detalles de la receta

  constructor(private router: Router) {}

  ngOnInit() {
    // Verifica si el estado de la navegación tiene datos de receta
    if (history.state && history.state.receta) {
      this.receta = history.state.receta;
    } else {
      console.error('No se pasó la receta al detalle');
    }
  }
  

  // Método para volver a la página de inicio
  volver() {
    this.router.navigate(['/home']);
  }
}
