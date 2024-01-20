import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked ,Renderer2} from '@angular/core';
import { faMessage ,faBell ,faUser,faPaperPlane, faMoon} from '@fortawesome/free-regular-svg-icons';
import { faPhone,faGear,faRightFromBracket ,faSearch} from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, timestamp } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { StylingService } from 'src/app/shared/styling.service';
import { ChatService } from 'src/app/services/chat.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Timestamp } from 'firebase/firestore';


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
  
  
 
export class MainComponent implements OnInit, AfterViewChecked{
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
  
  
  chats: any[];
  people:any[]=[];  

  currentUserId: string; // Add this property


  inputMessage: any;
  selectedChatId: any;
  selectUserId: any;
  isGroup = false;
  members: {[key: string]: string} = {};

  @ViewChild('chatContainer') private chatContainer: ElementRef;

  
  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    public styleService: StylingService,
    private chatService: ChatService,
    private db: AngularFireDatabase,
    private renderer: Renderer2
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
  
  ngAfterViewChecked(): void {
    this.scrollChatToBottom();
  }
  
  scrollChatToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
  
  getUserInformation() {
    this.db.object(`/users/${this.currentUserId}`).valueChanges().subscribe((userData: any) => {
      if (userData == null) {
        this.afAuth.signOut().then(() => {
          this.router.navigate(['/login']);
        })
      }
      this.name = userData.username;

      let chats = userData['chats'];
      this.chats = [];
      
      for(const chat of Object.entries(chats).map(([key, value]) => ({  key, value  }))){
        let temp:any = chat.value;
        temp.key = chat.key;
        this.chats.push(temp)
      }

      this.getChatInformation();
      
      this.profilePhotoUrl = userData.profilePhoto;
      
      
      if (this.profilePhotoUrl != "") {
        this.flag = false;
      }
    })
    
  }
  
  getChatInformation() {
      
    this.people=[];
    
    for (const chat of this.chats.sort((a, b) => b.time - a.time)) {
     
      if(!chat.hasOwnProperty('group')){
        let sub = this.db.object(`/users/${chat.key}`).valueChanges().subscribe((userData: any) => {
          if (userData != null) {
            
            userData.id = chat.id;
            userData.key = chat.key;
            userData.group = false;

            this.people.push(userData);
            sub.unsubscribe();
          }
        })
      }
      else{
        let sub = this.db.object(`/GroupChats/${chat.id}`).valueChanges().subscribe((userData: any) => {
          if (userData != null) {
            
            userData.id = chat.id;
            userData.key = chat.key;
            userData.group = true;
            userData.username = userData.name;
            userData.profilePhoto = userData.groupPhoto;

            this.people.push(userData);
            sub.unsubscribe();
          }
        })
      }
    }
  }
  
  getChats(chat:any) {
    if(!chat.group){
      this.selectedUserName = chat.username;
      this.selectedUserPhoto = chat.profilePhoto;
      this.selectedChatId = chat.id;
      this.selectUserId = chat.key;
      this.isGroup = false
      this.members = {}

      this.db.object(`/IndividualChats/${chat.id}/Messages`).valueChanges().subscribe((chatMessages: any) => {
        this.db.object(`/users/${this.currentUserId}/chats/${chat.id}`).update({
          read: true
        })
          this.messages = [];
          if (chatMessages == null) {
            this.messages = null
          }
          else {
            this.messages=Object.values(chatMessages);
          
          }
        })
        
    }
    else{
      this.selectedUserName = chat.username;
      this.selectedUserPhoto = chat.profilePhoto;
      this.selectedChatId = chat.id;
      this.selectUserId = null;
      this.isGroup = true;
      this.members = chat.members;

      this.db.object(`/GroupChats/${chat.id}/Messages`).valueChanges().subscribe((chatMessages: any) => {
        this.db.object(`/users/${this.currentUserId}/chats/${chat.id}`).update({
          read: true
        })
        this.messages = [];
        if (chatMessages == null) {
          this.messages = null
        }
        else {
          this.messages=Object.values(chatMessages);
        
        }
      })
    }
    
  }
  
  sendMessage() {
    if (this.inputMessage.trim() !="") {
      if(!this.isGroup){
        this.db.list(`/IndividualChats/${this.selectedChatId}/Messages`).push({
          message: this.inputMessage.trim(),
          senderId: this.currentUserId
        })
        this.inputMessage = "";
        this.db.object(`/users/${this.selectUserId}/chats/${this.currentUserId}`).update({
          read: false,
          time: Timestamp.now().seconds
        })
        this.db.object(`/users/${this.currentUserId}/chats/${this.selectUserId}`).update({
          read: true,
          time: Timestamp.now().seconds
        })
      }
      else{
        this.db.list(`/GroupChats/${this.selectedChatId}/Messages`).push({
          message: this.inputMessage.trim(),
          senderId: this.currentUserId
        })
        this.inputMessage = "";
        for(let user of Object.values(this.members)){
          this.db.object(`/users/${user}/chats/${this.selectedChatId}`).update({
            read: false,
            time: Timestamp.now().seconds
          })
        }
      }
    }
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
