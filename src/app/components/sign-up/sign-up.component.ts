import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
    private router: Router,
    private auth: AngularFireAuth
  ) {
  }

  ngOnInit(): void {
   
  }

  
 
  // saveData() {
  //   this.firestore.collection('users').add({
  //     name: this.name,
  //     email: this.email,
  //     password:this.password
  //   });
  // }

  storeUserData(uid: string, name: string) {
    this.firestore.collection('users').doc(uid).set({
      name: name
    });
  }
   
  signUp(email: string, password: string,name: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          const uid = userCredential.user.uid;
          this.storeUserData(uid, name);
          localStorage.setItem('token', 'true');
          this.router.navigate(['/main']);
        } else {
          // Handle the case where userCredential.user is null
          console.error('User registration failed');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  

  
  


  // register() {
    
  //   this.firebaseService.register(this.email, this.password);
  //   this.name = '';
  //   this.email = '';
  //   this.password = '';
  //   this.confirmPassword = '';
  // }

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
        this.signUp(this.email,this.password,this.name);
    }
  }
  
  
  
  
}
