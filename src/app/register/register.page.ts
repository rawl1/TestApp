import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CancelAlertService } from '../managers/CancelAlertService';
import { UserRegistrationUseCase } from '../use-cases/user-registrarion.use';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {

  email: string = '';
  password: string = '';

  constructor(
    private userRegistrationUseCase: UserRegistrationUseCase,
    private router: Router,
    private alert: CancelAlertService
  ) { }

  async onRegisterButtonPressed() {
    // Llama al caso de uso para manejar el registro
    const result = await this.userRegistrationUseCase.performRegistration(this.email, this.password);

    // Si hay un mensaje de éxito, navega a otra vista
    if (result.success) {
      this.alert.showAlert(
        'Registro exitoso',
        'Ya eres parte de nuestro sistema',
        () => {
          this.router.navigate(['/login0']);
        }
      );
    } else {
      // Muestra el error proporcionado por el caso de uso
      this.alert.showAlert(
        'Error',
        result.message,
        () => {
          this.clean();
        }
      );
    }
  }

  clean() {
    this.email = '';
    this.password = '';
  }
}