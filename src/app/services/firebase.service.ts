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
  

  saveName(user:Users) {
    user.id = this.firestore.createId();
    return this.firestore.collection('/Users').add(user);
  }

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
      alert('registration successfull');
      this.router.navigate(['/main']);
    }, err => {
      alert('something went wrong.');
      this.router.navigate(['/register']);
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

  //forgot password

  forgotPassword(email:string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('something went wrong');
    })
  }




}
