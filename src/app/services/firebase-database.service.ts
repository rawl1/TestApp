import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  private usersCollection = 'users';  

  constructor(private firestore: AngularFirestore) {}


  addUser(user: User): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.usersCollection).doc(id).set({ ...user, id });
  }


  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>(this.usersCollection).valueChanges();
  }


  getUserFromDatabase(userId: string): Observable<User | undefined> {
    return this.firestore.collection(this.usersCollection).doc<User>(userId).valueChanges();
  }


  updateUser(id: string, user: Partial<User>): Promise<void> {
    if (!id) throw new Error('ID del usuario es inválido o está vacío.');
    return this.firestore.collection(this.usersCollection).doc(id).update(user);
  }


  deleteUser(id: string): Promise<void> {
    return this.firestore.collection(this.usersCollection).doc(id).delete();
  }
}
