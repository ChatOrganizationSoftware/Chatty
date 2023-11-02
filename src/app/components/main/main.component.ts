import { Component, OnInit } from '@angular/core';
import { faMessage ,faBell ,faUser,faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { faPhone,faGear,faRightFromBracket ,faSearch, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DataService } from 'src/app/shared/data.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



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
  arrow = faArrowLeft;

  showSettings = false;
  name: string;
  

  constructor(
    private firebaseService: FirebaseService,
    private sharedService: DataService,
    private firestore:AngularFirestore
  ) { }
  
  ngOnInit(): void {
  }


  

  openSettings(){
    this.showSettings = !this.showSettings;
  }

  changeTheme(){

  }

  changeBackground(){

  }

  changePassword(){

  }

  logout() {
    this.firebaseService.logout();
  }
  
}
