import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ValidService } from '../services/valid.service';
import { AuthService } from '../services/auth.service';
// import { FlashMessage, FlashMessageModule } from 'angular-flash-message';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {


  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validservice: ValidService,
    private authservice: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    this.name = '';
    this.username = '';
    this.password = '';
    this.email = '';
    // console.log(user);

    // required input data

    if (!this.validservice.valaidateReg(user)) {
      console.log('fill data in all field...');
      this.flashMessage.show('required field should not be empty', {cssClass: 'alert-danger',  timeout: 3000 });
      return false;
    }

    // valid email id here

    if (!this.validservice.validateEmail(user.email)) {
      this.flashMessage.show(' you entered wronge Email.id', {cssClass: 'alert-danger',  timeout: 3000 });
      console.log('you have entered wrong email ...');
      return true;
    }
    // console.log('you have entered wrong email ...');

    // register user here

    this.authservice.registerUser(user).subscribe(data => {
      if (data['success']) {
        this.flashMessage.show('YOU ARE REGISTER USER.... . .', { timeout: 3000 });
        // alert('YOU ARE REGISTER USER.... . . ');
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('YOU ARE NOT REGISTER USER .... . .', { timeout: 3000 });
        // alert('YOU ARE NOT REGISTER USER YET PLEASE TRY AGAIN.... . . ');
        this.router.navigate(['/reg']);
      }
    });
  }
}


