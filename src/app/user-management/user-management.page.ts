import { Component, OnInit } from '@angular/core';
import { FirebaseDatabaseService } from '../services/firebase-database.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {

  users: User[] = [];
  userName: string = '';
  userId: string | null = null; // ID del usuario que se va a editar
  email: string = '';

  constructor(private firebaseDatabaseService: FirebaseDatabaseService) {}

  ngOnInit() {
    // Obtener la lista de usuarios al cargar la página
    this.firebaseDatabaseService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  // Método para guardar o actualizar un usuario
  async onSaveUser() {
    // Asegúrate de que 'user' tenga todos los campos definidos en la interfaz User
    const user: User = {
      id: this.userId ?? '',          // UID del usuario
      email: this.email,              // Correo electrónico del usuario
      userName: this.userName,        // Nombre del usuario
      createdAt: new Date().toISOString(),  // Fecha de creación
    };
  
    if (this.userId) {
      // Actualizar usuario
      await this.firebaseDatabaseService.updateUser(this.userId, { userName: this.userName });
    } else {
      // Agregar nuevo usuario
      await this.firebaseDatabaseService.addUser(user);
    }
  
    // Reiniciar los campos del formulario
    this.resetForm();
  }
  

  // Método para editar un usuario
  onEditUser(user: User) {
    this.userId = user.id;
    this.userName = user.userName;
  }

  // Método para eliminar un usuario
  async onDeleteUser(id: string) {
    await this.firebaseDatabaseService.deleteUser(id);
  }

  // Método para resetear el formulario
  resetForm() {
    this.userId = null;
    this.userName = '';
  }
}
