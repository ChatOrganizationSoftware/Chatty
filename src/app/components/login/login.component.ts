import { Component } from '@angular/core';
import { faLock,faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  lock = faLock;
  user = faUser;
}
