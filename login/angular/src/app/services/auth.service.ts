import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    // console.log('proble here ..... . .' + user);
    return this.http.post('http://localhost:3000/goto/reg', user, { headers: headers })
      .map(res => res.json());
  }

  authUser(user) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    //  console.log('proble here ..... . .' + user);
    return this.http.post('http://localhost:3000/goto/auth', user, { headers: headers })
      .map(res => res.json());
  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    //  console.log('proble here ..... . .');
    return this.http.get('http://localhost:3000/goto/profile', { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // console.log('proble here ..... . .' + user);
    this.authToken = token;
    this.authUser = user;
  }

  loggedIn() {
    const token = localStorage.getItem('id_token');
    // console.log(tokenNotExpired('id_token'));
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  editUpdate(user) {
    // console.log('call from Authservice user  ' + user._id);
    this.loadToken();
    const headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.patch('http://localhost:3000/goto/update', user, { headers: headers })
      .map(res => res.json());
  }




  authUserP(user_P) {
    // console.log('calling from auth service ' + user_P);
    this.loadToken();
    const headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/goto/pwdauth', user_P, { headers: headers })
      .map(res => res.json());
  }
}
