import { Component, OnInit } from '@angular/core';
import { faMessage ,faBell ,faUser,faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { faPhone,faGear,faRightFromBracket ,faSearch} from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DataService } from 'src/app/shared/data.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


interface User{
  name:string
}

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
  name: string;
  
  UserCol: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(
    private firebaseService: FirebaseService,
    private sharedService: DataService,
    private firestore:AngularFirestore
  ) { }
  
  ngOnInit(): void {
    this.UserCol = this.firestore.collection('users');
    this.users = this.UserCol.valueChanges();
  }
  getName() {
    return this.firestore.collection('users.name').valueChanges();
  }

  
  
  logout() {
    this.firebaseService.logout();
  }
  
}
