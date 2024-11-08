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
  userId: string | null = null;
  userEmail: string = '';

  constructor(private firebaseDatabaseService: FirebaseDatabaseService) {}

  ngOnInit() {
    
    this.firebaseDatabaseService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

 
  async onSaveUser() {
    
    const user: User = {
      id: this.userId ?? '',
      email: this.userEmail,
      userName: this.userName,
      createdAt: new Date().toISOString(),
    };
  
    if (this.userId) {
      
      await this.firebaseDatabaseService.updateUser(this.userId, { 
        userName: this.userName, 
        email: this.userEmail 
      });
    } else {
      
      await this.firebaseDatabaseService.addUser(user);
    }
  
    
    this.resetForm();
  }
  

  
  onEditUser(user: User) {
    this.userId = user.id;
    this.userName = user.userName;
  }

  
  async onDeleteUser(id: string) {
    await this.firebaseDatabaseService.deleteUser(id);
  }

  
  resetForm() {
    this.userId = null;
    this.userName = '';
  }
}
