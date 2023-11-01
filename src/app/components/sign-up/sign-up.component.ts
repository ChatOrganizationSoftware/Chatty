import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Users } from 'src/app/model/users';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DataService } from 'src/app/shared/data.service';



@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  
  eye = faEye;
  showPassword = false;

  users: Users[] = [];
  id: string;
  name: string='';

  email: string = '';
  password: string = '';
 
 
  constructor(
    private firebaseService: FirebaseService,
    private sharedService: DataService,
    private firestore :AngularFirestore
  ) {
  }

  ngOnInit(): void {
   
  }

  
  addDataToFirestore(data:any) {
    this.sharedService.addData(data);
  }
  saveData() {
    this.firestore.collection('users').add({ name: this.name });
  }
   
  

  
  getFirstWord(input: string){
    const words = input.split(' ');
    if (words.length > 0) {
      return words[0];
    } else {
      return '';
    }
  }


  register() {
    
    if (this.email == '') {
      alert("enter everything");
      return;
    }
    if (this.password == '') {
      alert("enter everything");
      return;
    }

    this.firebaseService.register(this.email, this.password);
    this.email = '';
    this.password = '';
      
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  
  
  
  
}
