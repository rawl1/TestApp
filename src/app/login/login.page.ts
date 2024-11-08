import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@ionic/storage-angular';
import { FirebaseDatabaseService } from '../services/firebase-database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private firebaseDatabaseService: FirebaseDatabaseService 
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  // funcion del login
  async onLoginButtonPressed() {
    console.log('User:', this.user);
    console.log('Password:', this.password);

    try {
      // inica sesion con fireatuth
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.user, this.password);
      console.log('Usuario logueado', userCredential);

      // obetener datos de realtime database
      const userData = await this.firebaseDatabaseService.getUserFromDatabase(userCredential.user?.uid).toPromise();
      console.log('Datos del usuario:', userData);

      // guarada el nombre de usuario en local storage
      this.storage.set("nombreUsuario", userData?.userName);

      // Redirigir a la página de inicio
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      alert('Las credenciales ingresadas son inválidas');
    }
  }

  onRegisterButtonPressed() {
    this.router.navigate(['/register']);
  }
}
