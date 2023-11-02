import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Users } from 'src/app/model/users';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DataService } from 'src/app/shared/data.service';



@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  
  eye = faEye;
  showPassword = false;
  showConfirmPassword = false;

  name: string='';

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isPasswordMatch = true;
 
 
  constructor(
    private firebaseService: FirebaseService,
    private sharedService: DataService,
    private firestore: AngularFirestore,
    private router:Router
  ) {
  }

  ngOnInit(): void {
   
  }

  
 
  saveData() {
    this.firestore.collection('users').add({ name: this.name });
  }
   
  

  
  getFirstWord(input: string){
    const words = input.split(' ');
    if (words.length > 0) {
      return words[0];
    } else {
      return '';
    }
  }


  register() {
    
    this.firebaseService.register(this.email, this.password);
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
  PasswordShow() {
    this.showPassword = !this.showPassword;
  }
  ConfirmPasswordShow() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkPasswordMatch() {
    if (this.password !== this.confirmPassword) {
         this.isPasswordMatch = false;
         alert('Passwords do not match. Please try again.');
        return;
    }
    else {
        this.isPasswordMatch = true;
        this.register();
        this.saveData();
    }
  }
  
  
  
  
}
