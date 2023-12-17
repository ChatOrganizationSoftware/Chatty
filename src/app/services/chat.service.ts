// chat.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore ,DocumentReference} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Message } from '../model/message.model';
import { switchMap ,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) { }
  

  searchUsers(query: string): Observable<any[]> {
    return this.auth.user.pipe(
      switchMap(user => {
        // Check if the user is authenticated
        if (user) {
          return this.firestore
            .collection('users', ref => ref.where('name', '>=', query).orderBy('name'))
            .valueChanges()
            .pipe(
              // Exclude the current user from the search results
              map((users: any[]) => users.filter(u => u.uid !== user.uid))
            );
        } else {
          // User is not authenticated, return an empty array or handle it as needed
          return [];
        }
      })
    );
  }

  getUserById(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  sendMessage(senderId: string, receiverId: string, message: string) {
    const timestamp = new Date();
    console.log("fknloqew");
    return this.firestore.collection('messages').add({
      senderId,
      receiverId,
      message,
      timestamp
    });
  }

  getMessages(userId: string) {
    return this.firestore
      .collection('messages', ref =>
        ref.where('senderId', '==', userId).orderBy('timestamp')
      )
      .valueChanges();
  }

}




