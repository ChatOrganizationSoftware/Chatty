import { Component } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  eye = faEye;
}
