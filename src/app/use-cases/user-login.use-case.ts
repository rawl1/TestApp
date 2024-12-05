import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from '../managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class UserLoginUseCase {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore, // Importa AngularFirestore en lugar de AngularFireDatabase
    private storageService: StorageService
  ) {}

  async performLogin(email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      // Autenticar el usuario utilizando Firebase Authentication
      const userCredential = await this.fireAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        const uid = user.uid;

        // Obtener la información del usuario desde Cloud Firestore
        const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
        const userData = userDoc.data();

        if (userData) {
          // Guardar los datos obtenidos de Cloud Firestore en Ionic Storage
          await this.storageService.set('user', {
            uid: uid,
            email: user.email || '',  // Si email es nulo, guarda string vacío
            
          });

          return { success: true, message: "Login successful" };
        } else {
          return { success: false, message: "User not found in Firestore" };
        }
      } else {
        return { success: false, message: "Authentication failed, user not found" };
      }
    } catch (error: any) {
      let errorMessage = 'Error during login';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'User not found. Please check your credentials.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        default:
          errorMessage += ': ' + error.message;
          break;
      }

      return { success: false, message: errorMessage };
    }
  }
}
