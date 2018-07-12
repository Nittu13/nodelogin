import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ValidService } from '../services/valid.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
    name: string;
    username: string;
    email: string;
    fname: string;
    mono: string;
    addr: string;

  constructor(
    private authService: AuthService,
    private valid: ValidService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      // console.log(profile.user);
      this.name = this.user.name;
      this.username = this.user.username;
      this.email = this.user.email;
      this.fname = this.user.fname;
      this.addr = this.user.addr;
      this.mono = this.user.mono;
    },
    err => {

      console.log(err);
      return false;
    });
  }
  // editbtn() {
  //   console.log(this.user);
  // }

}
