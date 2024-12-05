import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres únicos para los archivos
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  // Método para subir una imagen en formato base64
  async uploadImage(path: string, base64Data: string): Promise<string | null> {
    try {
      // Convertir la imagen base64 a Blob
      const base64Response = await fetch(base64Data);
      const blob = await base64Response.blob();

      // Generar un nombre único para la imagen
      const uniqueFileName = `${path}/${uuidv4()}.jpg`;

      // Crear referencia en Firebase Storage
      const storageRef = this.storage.ref(uniqueFileName);

      // Subir el archivo a Firebase Storage
      const task = storageRef.put(blob);

      // Esperar hasta que la carga finalice y obtener la URL de descarga
      return new Promise<string | null>((resolve, reject) => {
        task
          .snapshotChanges()
          .pipe(
            finalize(async () => {
              const downloadUrl = await storageRef.getDownloadURL().toPromise();
              resolve(downloadUrl);
            })
          )
          .subscribe({
            error: (err) => {
              console.error('Error uploading image:', err);
              reject(null);
            },
          });
      });
    } catch (error) {
      console.error('Error processing image upload:', error);
      return null;
    }
  }

  // Método para guardar información del usuario en Firestore
  async saveUserData(userId: string, userData: any): Promise<void> {
    try {
      await this.firestore.collection('users').doc(userId).set(userData, { merge: true });
      console.log('User data successfully saved');
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }

  // Método para obtener información del usuario desde Firestore
  async getUserData(userId: string): Promise<any | null> {
    try {
      const doc = await this.firestore.collection('users').doc(userId).get().toPromise();
      return doc?.data() || null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }
}
