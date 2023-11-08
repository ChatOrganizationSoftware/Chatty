import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { StylingService } from 'src/app/shared/styling.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  arrow = faArrowLeft;

  showThemeSettings = false;
  showPasswordSettings = false;


  theme = 'Default';

  currentPass = "";   // Stores the current password when entered
  newPass = "";       // Stores the new password when entered
  confirmPass = "";   // Stores the confirm password when entered

  constructor(private router: Router, private styleService: StylingService, private firebaseService: FirebaseService){}


  // Classes the settings
  returnToMain(){
    this.router.navigate(['main'])
  }

  // Opens/closses theme options
  showThemeSet(){
    this.showThemeSettings = !this.showThemeSettings;
  }

  // Sends selected theme to service
  changeTheme(theme:string){
    this.theme = theme;
    this.styleService.updateTheme(this.theme);
    
  }

  // Opens/closses change password option
  showPasswordSet(){
    this.showPasswordSettings = !this.showPasswordSettings;
  }

  // Checks the fields and calls changePassword function of service
  changePassword(){
    if(this.currentPass!="" || this.newPass!="" || this.confirmPass!=""){
      if(this.newPass == this.confirmPass){
        this.firebaseService.changePassword(this.currentPass, this.newPass)
      }
      else{
        alert('New password and Confirm password should be same. Please check them.')
      }
    }
    else{
      alert('Please make sure you filled all the fields.')
    }
  }
}
