import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private collectionName = 'recetas';  // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Método para agregar una receta
  addRecipe(recipe: any) {
    // Se usa el método `add` para agregar el objeto `recipe` a Firestore
    return this.firestore.collection(this.collectionName).add(recipe);
  }

  // Método para obtener todas las recetas
  getRecipes() {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }
}
