import { Component, OnInit } from '@angular/core';
import { faMessage ,faBell ,faUser,faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { faPhone,faGear,faRightFromBracket ,faSearch} from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  search = faSearch;
  user = faUser;
  message = faMessage;
  phone = faPhone;
  bell = faBell;
  settings = faGear;
  log_out = faRightFromBracket;
  send = faPaperPlane;

  constructor(private firebaseService: FirebaseService,private sharedService:DataService) { }
  
  ngOnInit(): void {
    
  }

  getData() {
    return this.sharedService.getSharedData();
  }
  
  logout() {
    this.firebaseService.logout();
  }
  
}
