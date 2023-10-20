import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';



@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  
  eye = faEye;

  email: string = '';
  password: string = '';
 
 
  constructor(public firebaseService:FirebaseService) {
  }

  ngOnInit(): void {
   
  }

  register() {
    
    if (this.email == '') {
      alert("enter everything");
      return;
    }
    if (this.password == '') {
      alert("enter everything");
      return;
    }

    this.firebaseService.register(this.email, this.password);
    this.email = '';
    this.password = '';
      
  }
  
  
  
}
