import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { FirebaseDatabaseService } from '../services/firebase-database.service';  // Importa el servicio de Firebase Realtime Database
import { User } from '../models/user.model';  // Asegúrate de importar el modelo de usuario

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: string = '';  // Nombre de usuario
  email: string = '';  // Correo electrónico
  password: string = '';  // Contraseña
  confirmPassword: string = '';  // Confirmar contraseña

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private firebaseDatabaseService: FirebaseDatabaseService  // Inyecta el servicio
  ) {}

  ngOnInit() {}

  // Función para manejar el registro
  async onRegisterButtonPressed() {
    // Validación de contraseñas
    if (this.password !== this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    // Validación de campos vacíos
    if (!this.user || !this.email || !this.password || !this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'Por favor completa todos los campos.',
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
      const userData: User = {
        id: userCredential.user?.uid || '',  // UID de Firebase Auth
        email: this.email,  // Correo electrónico del usuario
        userName: this.user,  // Nombre de usuario
        createdAt: new Date().toISOString(),  // Fecha de creación
      };
      
      // Guardar datos del usuario en Firebase Realtime Database
      await this.firebaseDatabaseService.addUser(userData);

      // Redirigir a la página de login
      this.router.navigate(['/login']);
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
