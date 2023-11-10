import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  email = faEnvelopeCircleCheck;

  constructor(private fireService: FirebaseService,
              private auth: AngularFireAuth
              ){}

  resendLink(){
    if(this.auth.currentUser)
      this.fireService.sendEmailForVarification(this.auth.currentUser);
    else
      alert("Something went wrong. Not able to send verification link to your email.");
  }

}

