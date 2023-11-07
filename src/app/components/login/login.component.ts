import { Component, OnInit } from '@angular/core';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  showPassword = false;

  lock = faLock;
  user = faUser;
  eye = faEye;
  
  email: string = '';
  password: string = '';
 
  constructor(public firebaseService:FirebaseService) {
  }

  ngOnInit(): void {
    
  }

  login() {
    
    
    if (this.email && this.password) {
      this.firebaseService.login(this.email, this.password);
      this.email = '';
      this.password = '';
    }
    
      
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }


}
