import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylingService {
  background!: {
                  'background-color': '#869FDD'
                };
  
  theme = 'default'

  constructor() { }

  updateBackgroundColor(backgroundColors:any){
    this.background = backgroundColors;
  }
}
