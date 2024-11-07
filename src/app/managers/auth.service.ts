// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Register
  async register(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  // login
  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  // logout
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  // Actual sesion
  getCurrentUser() {
    return this.afAuth.authState;
  }
}
