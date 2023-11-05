import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private firestore:AngularFirestore
  ) { }
  

 

  // login method

  login(email:string,password:string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/main']);
    }, err => {
      alert('something went wrong.');
      this.router.navigate(['/login']);
    })
  }
  // register method

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/main']);
      alert('registration successfull');
    }, err => {
      this.router.navigate(['/register']);
      alert('something went wrong.');
    })
  }

  //log out method

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/logout']);
    }, err => {
      alert('something went wrong.');
    })
  }

  changePassword(currentPassword:string, newPassword:string){
    const user = this.fireauth.currentUser;

  }

  




}
