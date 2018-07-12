import { Component, OnInit } from '@angular/core';

import { ValidService } from '../services/valid.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  user;
  name: string;
  username: string;
  email: string;


  constructor(
    private authService: AuthService,
    private valid: ValidService,
    // private router: Router,
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      // console.log(profile.user);
      // console.log(this.user.name);
      this.name = this.user.name;
      this.username = this.user.username;
      this.email = this.user.email;
    },
    err => {
      console.log(err);
      return false;
    });

  }

}
