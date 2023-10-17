import { Component } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  check=faCircleCheck;

}
