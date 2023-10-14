import { Component } from '@angular/core';
import { faMessage ,faBell ,faUser,faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { faPhone,faGear,faRightFromBracket ,faSearch} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  search = faSearch;
  user = faUser;
  message = faMessage;
  phone = faPhone;
  bell = faBell;
  settings = faGear;
  log_out = faRightFromBracket;
  send = faPaperPlane;
  
}
