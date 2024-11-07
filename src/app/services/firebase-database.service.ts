import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importar el servicio de Firebase
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDatabaseService {
  constructor(private db: AngularFireDatabase) {}

  // Método para obtener todos los elementos de una referencia en la base de datos
  getItems(): Observable<any[]> {
    return this.db.list('items').valueChanges(); // 'items' es el nodo de la base de datos
  }

  // Método para agregar un nuevo usuario (o cualquier dato)
  addUserToDatabase(uid: string, userData: any): Promise<void> {
    return this.db.object(`/users/${uid}`).set(userData);
  }

  // Método para obtener los datos de un usuario
  getUserFromDatabase(uid: string): Observable<any> {
    return this.db.object(`/users/${uid}`).valueChanges();
  }

  // Método para actualizar datos de un usuario
  updateUserInDatabase(uid: string, userData: any): Promise<void> {
    return this.db.object(`/users/${uid}`).update(userData);
  }

  // Método para eliminar un usuario
  deleteUserFromDatabase(uid: string): Promise<void> {
    return this.db.object(`/users/${uid}`).remove();
  }
}
