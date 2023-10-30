import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{


  email: string = '';


  constructor(private fire:FirebaseService){}

  ngOnInit(): void {
    
  }

  forgotPassword() {
    this.fire.forgotPassword(this.email);
    this.email = '';
  }

}
