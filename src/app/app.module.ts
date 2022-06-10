import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SocialLoginModule,GoogleLoginProvider} from 'angularx-social-login';
import {HttpClientModule} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import {ToastrModule} from 'ngx-toastr'
import { CommonModule, DatePipe } from '@angular/common';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import{Ng2SearchPipeModule} from 'ng2-search-filter'


import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { TournamentHistoryComponent } from './components/tournament-history/tournament-history.component';
import { ForgetPageComponent } from './components/forget-page/forget-page.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { TeamHistoryComponent } from './components/team-history/team-history.component';

const socialProvider={
  provide:"SocialAuthServiceConfig",
  useValue:{
    providers:[{
      id:GoogleLoginProvider.PROVIDER_ID,
      provider:new GoogleLoginProvider('862613242441-586e0opknj44rplkvhh3d6q6gfjngiij.apps.googleusercontent.com')
    }]
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    EventsComponent,
    EventDetailsComponent,
    PlayerListComponent,
    ViewProfileComponent,
    AboutComponent,
    ContactComponent,
    RegistrationFormComponent,
    UserProfileComponent,

    UpdateProfileComponent,
      TournamentHistoryComponent,
      ForgetPageComponent,
      NewPasswordComponent,
      TeamHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    SocialLoginModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot()
  ],
  providers: [socialProvider,
  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }


