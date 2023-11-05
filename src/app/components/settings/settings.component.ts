import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { StylingService } from 'src/app/shared/styling.service';

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


  constructor(private router: Router, private styleService: StylingService){}


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

  }
}
