import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { FirebaseDatabaseService } from '../services/firebase-database.service';  // Importa el servicio de Firebase Realtime Database

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private firebaseDatabaseService: FirebaseDatabaseService  // Inyecta el servicio
  ) {}

  ngOnInit() {}

  // Función para manejar el registro
  async onRegisterButtonPressed() {
    if (this.password !== this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    try {
      // Crear cuenta con el email y contraseña
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      console.log('Usuario registrado', userCredential);

      // Crear datos del usuario
      const userData = {
        email: this.email,
        userName: this.user,
        createdAt: new Date().toISOString(),
      };

      // Guardar datos del usuario en Firebase Realtime Database
      await this.firebaseDatabaseService.addUserToDatabase(userCredential.user?.uid, userData);

      // Redirigir a la página de inicio
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al registrar', error);
      const toast = await this.toastController.create({
        message: 'Error al registrar, intenta de nuevo.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  // Función para navegar al login
  onLoginButtonPressed() {
    this.router.navigate(['/login']);
  }
}
