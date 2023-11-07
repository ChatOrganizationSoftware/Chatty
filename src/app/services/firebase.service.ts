import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }
  

  // login method

  login(email:string,password:string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/main']);
    }, err => {
      alert('Something went wrong with forgot password.');
      this.router.navigate(['/login']);
    })
  }
  // register method

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration successfull!');
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


// forgot password method
  
  forgotPassword(email: string) {

      this.fireauth.sendPasswordResetEmail(email).then(() => {
        alert('Password reset email sent');
        this.router.navigate(['/login']);
      }, err => {
        alert('something went wrong.');
        this.router.navigate(['/forgot-password']);
      })
    }




}
