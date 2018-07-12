import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './authguards/auth.gaurd';

import { ValidService } from './services/valid.service';
import { AuthService } from './services/auth.service';
// import { FlashMessageModule, FlashMessage } from 'angular-flash-message';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { EditComponent } from './edit/edit.component';

// const root: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'home', component: RegComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'cnt', component: ContactComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    RegComponent,
    HomeComponent,
    // AuthGuard,
    ContactComponent,
    DashbordComponent,
    ProfileComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlashMessagesModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'reg', component: RegComponent },
      { path: 'login', component: LoginComponent },
      { path: 'cnt', component: ContactComponent },
      { path: 'dsbd', component: DashbordComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },

    ])
  ],
  providers: [ValidService, AuthGuard, AuthService, FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }



