import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private collectionName = 'recetas';  // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Método para agregar una receta
  addRecipe(receta: any) {
    return this.firestore.collection('recipes').add(receta);
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
