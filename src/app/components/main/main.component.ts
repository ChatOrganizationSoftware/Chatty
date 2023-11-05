import { Component, OnInit } from '@angular/core';
import { faMessage ,faBell ,faUser,faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { faPhone,faGear,faRightFromBracket ,faSearch} from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DataService } from 'src/app/shared/data.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';



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
  

  constructor(
    private firebaseService: FirebaseService,
    private sharedService: DataService,
    private firestore:AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
  }
  
  openSettings(){
    this.router.navigate(['settings'], {relativeTo: this.route})
  }

  logout() {
    this.firebaseService.logout();
  }
  
}
