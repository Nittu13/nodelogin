import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ValidService } from '../services/valid.service';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  title_1 = 'Profile Image';
  title_2 = 'Personal Detail';
  title_3 = 'Change Password';
  title_4 = 'Contact Detail';
  user;
  user_P;

  // user: Object;
  // Edit for name
  username: String;
  pname: String;
  name: String;
  fname: String;
  mono: any;
  email: String;
  addr: String;
  userImage: File;
  _id;



  // Edit for password
  currentpassword: String;
  newpassword: String;
  confirmpassword: String;

  constructor(
    private validservice: ValidService,
    private authservice: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }
  onaftsubmitt = () => {
    this.currentpassword = '';
    this.newpassword = '';
    this.confirmpassword = '';
    this.name = '';
    this.fname = '';
    this.mono = '';
    this.email = '';
    this.addr = '';
  }
  ngOnInit() {
    this.authservice.getProfile().subscribe(profile => {
      this.pname = profile.user.name;
      this.user = profile.user;
      this._id = profile.user._id;
      this.name = this.user.name;
      this.fname = this.user.fname;
      this.username = this.user.username;
      this.email = this.user.email;
      this.addr = this.user.addr;
      this.mono = this.user.mono;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  onEditimg() {
    alert('image detail Edit button');
    console.log('image detail Edit button' + this._id);
    this.flashMessage.show('image button is working ....... ', { cssClass: 'alert-success', timeout: 3000 });
  }

  onEditpd() {
    this.user = {
      _id: this._id,
      username: this.username,
      name: this.name,
      fname: this.fname,
      mono: this.mono,
      email: this.email,
      addr: this.addr,
    };
    if (!this.validservice.validateEmail(this.email)) {
      this.flashMessage.show(' you entered wronge Email.id', { cssClass: 'alert-success', timeout: 3000 });
      console.log('you have entered wrong email ...');
      return true;
    }
    if (!this.validservice.validateeditdata(this.user)) {
      this.flashMessage.show('required field should not be empty', { cssClass: 'alert-success', timeout: 3000 });
      return false;
    }
    this.authservice.editUpdate(this.user).subscribe(edit => {
      this.user = edit.user;
      this.username = this.user.username;
      console.log(this.user_P),
        this.flashMessage.show('Personal detail is updated', { cssClass: 'alert-success', timeout: 3000 });
    }, (err) => {
      console.log(err);
    });

    this.onaftsubmitt();
    // this.name = '';
    // this.fname = '';
    // this.mono = '';
    // this.email = '';
    // this.addr = '';
  }


  onEditcpd() {
    this.user_P = {
      _id: this._id,
      currentpassword: this.currentpassword,
      newpassword: this.newpassword,
      confirmpassword: this.confirmpassword,
    };


    if (this.user_P.newpassword === this.user_P.confirmpassword) {
      this.authservice.authUserP(this.user_P).subscribe(edit1 => {
        this.user = edit1.user;
      }, (err) => {
        console.log(err);
      });
    } else {
      this.flashMessage.show('New password and confirm password is no match', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if (!this.validservice.validatepwddata(this.user_P)) {
      this.flashMessage.show('required field should not be empty', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    console.log(this.user_P);

    // this.onaftsubmitt();
    this.currentpassword = '';
    this.newpassword = '';
    this.confirmpassword = '';
    this.flashMessage.show('Password updated successfully ', { cssClass: 'alert-success', timeout: 3000 });
    // console.log(this.user_P);
  }

}
