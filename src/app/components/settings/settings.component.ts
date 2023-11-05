import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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


  constructor(private router: Router){}


  returnToMain(){
    this.router.navigate(['main'])
  }

  changeTheme(){
    this.showThemeSettings = !this.showThemeSettings;
  }

  changeBackground(){
    this.showBackgroundSettings = !this.showBackgroundSettings;
  }

  changePassword(){
    this.showPasswordSettings = !this.showPasswordSettings;
  }
}
