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
  showBackgroundSettings = false;
  showPasswordSettings = false;

  background = {
                'background-color': '#869FDD'
                }

  theme = 'default';

  currentPass = "";
  newPass = "";
  confirmPass = "";

  constructor(private router: Router, private styleService: StylingService, private firebaseService: FirebaseService){}


  returnToMain(){
    this.router.navigate(['main'])
  }

  showThemeSet(){
    this.showThemeSettings = !this.showThemeSettings;
  }

  changeTheme(theme:string){
    this.theme = theme;
  }

  showBackgroundSet(){
    this.showBackgroundSettings = !this.showBackgroundSettings;
  }

  changeBackground(color:string){
    this.background['background-color'] = color;
    this.styleService.updateBackgroundColor(this.background)
  }

  showPasswordSet(){
    this.showPasswordSettings = !this.showPasswordSettings;
  }

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