import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title = 'Making';
  title2 = 'rapid';
  title3 = 'obsolete';
  constructor(
    private router: Router,
    private auth: AuthService,
    private flashMessage: FlashMessagesService ) { }


  ngOnInit() {

  }
  onlogoutC() {
    this.auth.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    // confirm('You are logged out.... . .');
  this.router.navigate(['/home']);
  return false;
  }
}
