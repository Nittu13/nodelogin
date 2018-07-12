import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
// import { FlashMessage } from 'angular-flash-message';
// import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../reg/reg.component.css',
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flash: FlashMessagesService
  ) { }
  username: String;
  password: String;
  ngOnInit() {
  }
  onlogin() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.username = '';
    this.password = '';
    // console.log(user);
    this.authService.authUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flash.show('You are Logged in', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['dsbd']);
      } else {
        // alert(data.msg);
        this.flash.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
      // console.log(data);
    });
  }
}
