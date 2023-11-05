import { Component, OnInit } from '@angular/core';
import { faMessage ,faBell ,faUser,faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { faPhone,faGear,faRightFromBracket ,faSearch} from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  name: any;
  
  userId: string;

  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}
  
  ngOnInit(): void {
    this.afAuth.authState.subscribe((name) => {
      if (name) {
        this.firestore.collection('users').doc(name.uid).valueChanges().subscribe((userData: any) => {
          this.name = userData;
        });
        this.userId = name.uid;
      }
    });
  }

  getFirstWord(input: string){
    const words = input.split(' ');
    if (words.length > 0) {
      return words[0];
    } else {
      return '';
    }
  }
  
  
  
 
  
  logout() {
    this.firebaseService.logout();
  }
  
}
