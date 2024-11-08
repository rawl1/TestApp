import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  private usersCollection = 'users';  // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Método para crear un nuevo usuario
  addUser(user: User): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.usersCollection).doc(id).set({ ...user, id });
  }

  // Método para obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>(this.usersCollection).valueChanges();
  }

  // Método para obtener un usuario específico por su ID
  getUserFromDatabase(userId: string): Observable<User | undefined> {
    return this.firestore.collection(this.usersCollection).doc<User>(userId).valueChanges();
  }

  // Método para actualizar un usuario
  updateUser(id: string, user: Partial<User>): Promise<void> {
    return this.firestore.collection(this.usersCollection).doc(id).update(user);
  }

  // Método para eliminar un usuario
  deleteUser(id: string): Promise<void> {
    return this.firestore.collection(this.usersCollection).doc(id).delete();
  }
}
