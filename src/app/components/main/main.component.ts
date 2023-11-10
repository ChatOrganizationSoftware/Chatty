import { Component, OnInit } from '@angular/core';
import { faMessage ,faBell ,faUser,faPaperPlane, faMoon} from '@fortawesome/free-regular-svg-icons';
import { faPhone,faGear,faRightFromBracket ,faSearch} from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { StylingService } from 'src/app/shared/styling.service';



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
  showConfirmation = false; // Başlangıçta onay iletişim kutusu gizlenmiş
  confirmationText = 'Çıkış yapmak istediğinize emin misiniz?';
  darkMode = faMoon;

  theme = "Default";
  

  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    public styleService: StylingService
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
  
  toggleIcon() {
    this.showConfirmation = !this.showConfirmation; // Her tıklamada bilgi durumunu tersine çevir
  }

  confirmLogout() {
    // Kullanıcı "Evet" seçeneğini tıkladığında yapılacak işlemler burada olmalı
    // Örneğin, çıkış işlemini gerçekleştirebilirsiniz
    // Ardından onay iletişim kutusunu gizleyebilirsiniz
    this.logout(); // Çıkış işlemini gerçekleştirin (örnek)
    this.showConfirmation = false; // Onay iletişim kutusunu gizle
  }
  
  cancelLogout() {
    // Kullanıcı "Hayır" seçeneğini tıkladığında yapılacak işlemler burada olmalı
    // İptal işlemini gerçekleştirerek onay iletişim kutusunu gizleyebilirsiniz
    this.showConfirmation = false; // Onay iletişim kutusunu gizle
  }
  
  openSettings(){
    
    if (this.router.url.indexOf('/settings') > -1)    // If the settings are already opened ,clases it
      this.router.navigate(['main']);
    else
      this.router.navigate(['settings'], {relativeTo: this.route});   // Opens settings
  }

  logout() {
    this.firebaseService.logout();
  }  
}
