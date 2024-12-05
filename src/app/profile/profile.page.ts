import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from '../managers/baseperfil-service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserLogoutUseCase } from '../use-cases/user-logout.use-case';
import { CancelAlertService } from '../managers/CancelAlertService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId: string = '';
  userName: string = '';
  email: string = '';
  imageUrl: string = ''; // URL de la imagen de perfil
  isLoading: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router, // Usa esta instancia del enrutador
    private cancelAlertService: CancelAlertService,
    private logoutUseCase: UserLogoutUseCase,
  ) {}

  async ngOnInit() {
    // Obtén el usuario autenticado
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userId = user.uid;
        this.email = user.email || '';
        await this.loadUserData();
      }
    });
  }

  // Cargar los datos del usuario desde Firestore
  async loadUserData() {
    try {
      const userData = await this.firebaseService.getUserData(this.userId);
      if (userData) {
        this.userName = userData.userName || '';
        this.imageUrl = userData.imageUrl || '';
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      this.presentToast('Error al cargar datos de usuario.', 'danger');
    }
  }

  // Guardar los datos del usuario en Firestore
  async saveProfile() {
    if (!this.userName) {
      this.presentToast('Por favor, ingresa un nombre de usuario.', 'warning');
      return;
    }

    this.isLoading = true;

    try {
      const userData = {
        userName: this.userName,
        imageUrl: this.imageUrl,
      };

      await this.firebaseService.saveUserData(this.userId, userData);
      this.presentToast('Perfil actualizado correctamente.', 'success');
    } catch (error) {
      console.error('Error saving user data:', error);
      this.presentToast('Error al guardar los datos del perfil.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  // Subir una imagen de perfil a Firebase Storage
  async onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    this.isLoading = true;

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;

        // Subir la imagen y obtener la URL
        const imagePath = `profile-images/${this.userId}`;
        const downloadUrl = await this.firebaseService.uploadImage(imagePath, base64Data);
        if (downloadUrl) {
          this.imageUrl = downloadUrl;
          this.presentToast('Imagen subida exitosamente.', 'success');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      this.presentToast('Error al subir la imagen.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  // Mostrar mensajes emergentes
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
  
  async onSignOutButtonPressed() {
    this.cancelAlertService.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.logoutUseCase.performLogout();
        this.router.navigate(['/splash']);
      },
      () => { }
    );
  }

   // Métodos de navegación para tabs
   onHomeButtonPressed() {
    this.router.navigate(['/home']);
  }

  onRecipeButtonPressed() {
    this.router.navigate(['/ingresorecetas']);
  }

  onProfileButtonPressed() {
    this.router.navigate(['/profile']);
  }
}