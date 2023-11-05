import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylingService {
  background!: any;
  
  theme = 'default'

  constructor() { }

  updateBackgroundColor(backgroundColors:any){
    this.background = backgroundColors;
  }
}
