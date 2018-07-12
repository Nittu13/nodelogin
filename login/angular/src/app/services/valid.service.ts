import { Injectable } from '@angular/core';

@Injectable()
export class ValidService {

  constructor() { }
  validateeditdata(user) {
    if (user.name === undefined || user.fname === undefined || user.email === undefined || user.mono === undefined ) {
      return false;
    } else {
      return true;
    }
  }
  validatepwddata(user_P) {
    if (user_P.currentpassword === undefined || user_P.newpassword === undefined  || user_P.confirmpassword === undefined ) {
      return false;
    } else {
      return true;
    }
  }

  valaidateReg(user) {
    if (user.name === undefined || user.username === undefined || user.email === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(email) === false) {
      return re.test(email);
    } else {
      return true;
    }
  }
}

