import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { FirebaseDatabaseService } from '../services/firebase-database.service';
import { User } from '../models/user.model';

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
    private firebaseDatabaseService: FirebaseDatabaseService
  ) {}

  ngOnInit() {}

  
  async onRegisterButtonPressed() {
    // Valida password
    if (this.password !== this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    // valida campos vacios
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
      // crear cuenta con email y user
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      console.log('Usuario registrado', userCredential);

      // crea los datos
      const userData: User = {
        id: userCredential.user?.uid || '',  
        email: this.email,
        userName: this.user,
        createdAt: new Date().toISOString(),
      };
      
      
      await this.firebaseDatabaseService.addUser(userData);

     
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

  
  onLoginButtonPressed() {
    this.router.navigate(['/login']);
  }
}
