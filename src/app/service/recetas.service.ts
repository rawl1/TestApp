// recetas.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SessionManager } from '../managers/SessionManager';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private collectionName = 'recetas';  // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore, private sessiomanager: SessionManager) {}

  // Método para agregar una receta
  async agregarReceta(receta: any): Promise<void> {
    const user = await this.sessiomanager.getProfile(); // Obtiene el usuario autenticado
    if (user) {
      const recetaId = this.firestore.createId(); // Crea un ID único para la receta
      return this.firestore
        .collection('recetas')
        .doc(recetaId)
        .set({
          nombre: receta.nombre,
          ingredientes: receta.ingredientes,
          preparacion: receta.preparacion,
          imagen: receta.imagen,
          descripcion: receta.descripcion,
          userId: user.uid, // Guarda solo el UID del usuario autenticado
        });
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  // Método para obtener todas las recetas
  getRecipesByUser(userId: string) {
    return this.firestore.collection(this.collectionName, ref => ref.where('userId', '==', userId)).valueChanges({ idField: 'id' });
  }

  // Método para eliminar una receta
  deleteRecipe(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
