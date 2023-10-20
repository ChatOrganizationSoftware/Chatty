import { Component, OnInit } from '@angular/core';
import { faLock,faUser } from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  

  lock = faLock;
  user = faUser;
  
  email: string = '';
  password: string = '';
 
  constructor(public firebaseService:FirebaseService) {
  }

  ngOnInit(): void {
    
  }

  login() {
    
    if (this.email == '') {
      alert("enter everything");
      return;
    }
    if (this.password == '') {
      alert("enter everything");
      return;
    }

    this.firebaseService.login(this.email, this.password);
    this.email = '';
    this.password = '';
      
  }


}
