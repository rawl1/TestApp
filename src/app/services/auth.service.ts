import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Usa compat para compatibilidad con versiones recientes
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Método para iniciar sesión con correo y contraseña
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Iniciar sesión exitoso
        console.log('Usuario logueado:', userCredential.user);
        this.router.navigate(['/home']); // Redirige a la página principal
      })
      .catch(error => {
        console.error('Error en login:', error.message);
        throw error; // Lanza error si las credenciales son incorrectas
      });
  }

  // Método para cerrar sesión
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Método para registrar un nuevo usuario
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('Usuario registrado:', userCredential.user);
        this.router.navigate(['/home']); // Redirige a la página principal
      })
      .catch(error => {
        console.error('Error en el registro:', error.message);
        throw error; // Lanza error si algo sale mal
      });
  }

  // Método para verificar el estado de la sesión
  getUser() {
    return this.afAuth.authState;
  }
}
