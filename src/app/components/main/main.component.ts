import { Component, OnInit } from '@angular/core';
import { faMessage ,faBell ,faUser,faPaperPlane, faMoon} from '@fortawesome/free-regular-svg-icons';
import { faPhone,faGear,faRightFromBracket ,faSearch} from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { StylingService } from 'src/app/shared/styling.service';
import { ChatService } from 'src/app/services/chat.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';




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
  profilePhotoUrl: any;
  messages: any;
  
  flag = true;
  
  userId: string;
  showConfirmation = false; // Başlangıçta onay iletişim kutusu gizlenmiş
  confirmationText = 'Çikiş yapmak istediğinize emin misiniz?';
  darkMode = faMoon;

  theme = "Default";

  selectedUserName: string = ''; 
  selectedUserPhoto: string = ''; 
  
  
  chats: any;
  people:any[]=[];
  
  
  

  

  currentUserId: string; // Add this property




  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    public styleService: StylingService,
    private chatService: ChatService,
    private db:AngularFireDatabase
  ) {

    
   }
  
  
  
  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.currentUserId = user.uid; 
        this.getUserInformation();
        
      }
    });
    
  }
  
  getUserInformation() {
    this.db.object(`/users/${this.currentUserId}`).valueChanges().subscribe((userData: any) => {
      if (userData == null) {
        this.afAuth.signOut().then(() => {
          this.router.navigate(['/login']);
        })
      }
      this.name = userData.username;
      this.chats = userData.chats;
      this.getChatInformation();
      console.log(this.chats);
      this.profilePhotoUrl = userData.profilePhoto;
      
      
      if (this.profilePhotoUrl != "") {
        this.flag = false;
      }
    })
    
  }
  
  getChatInformation() {
      
    this.people=[];
  
    for (const key of Object.keys(this.chats)) {
     
      this.db.object(`/users/${key}`).valueChanges().subscribe((userData: any) => {
        if (userData != null) {
          const photoUrl = userData.profilePhoto;
          
          userData.id = this.chats[key].id;
          console.log(userData);
          this.people.push(userData);
          
        }
        
      })
    }
  }
  
  getKeyValues():{key:string,value:any}[] {
    return Object.entries(this.chats).map(([key, value]) => ({  key, value  }));
  }
  
  getChats(chat:any) {
    this.selectedUserName = chat.username;
    this.selectedUserPhoto = chat.profilePhoto;
    
    this.db.object(`/IndividualChats/${chat.id}/Messages`).valueChanges().subscribe((chatMessages: any) => {
      this.messages = [];
      if (chatMessages == null) {
        this.messages = null
      }
      else {
        this.messages=Object.values(chatMessages);
       
      }
      
    })
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
