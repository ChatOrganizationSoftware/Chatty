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
  confirmationText = 'Çikiş yapmak istediğinize emin misiniz?';
  darkMode = faMoon;

  theme = "Default";

  selectedUserName: string = ''; // Add this property


  query: string = '';
  searchResults: any[];

  messages: any[] = [];
  newMessage: string = '';
  selectedUser: any;

  currentUserId: string; // Add this property




  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    public styleService: StylingService,
    private chatService:ChatService
  ) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.currentUserId = user.uid;
      }
    });
   }
  
  
  
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

  searchUsers() {
    this.chatService.searchUsers(this.query).subscribe((results) => {
      this.searchResults = results;
    });
  }

  selectUser(user: any) {
    this.selectedUserName = user.name;
    this.searchResults = []; // Hide the user list after selecting a user
    this.query = ''; // Clear the search input
    this.loadMessages();



  }

  loadMessages() {
    if (this.selectedUser) {
      this.chatService.getMessages(this.selectedUser.uid).subscribe((messages) => {
        this.messages = messages;
      });
    }
  }

  sendMessage() {
    if (this.selectedUser && this.newMessage.trim() !== '') {
      const senderId = this.currentUserId;
      const receiverId = this.selectedUser.uid;
      const message = this.newMessage.trim();
  
      console.log('Sending Message:', { senderId, receiverId, message });
  
      this.chatService.sendMessage(senderId, receiverId, message).then(() => {
        console.log('Message Sent Successfully!');
        // Message sent successfully, you can update UI or clear input
        this.newMessage = '';
        this.loadMessages(); // Reload messages after sending a new one
      }).catch((error) => {
        console.error('Error Sending Message:', error);
      });
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
