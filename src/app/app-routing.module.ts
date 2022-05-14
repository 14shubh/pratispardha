import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
  },

  {
    path:'home',
    component: HomeComponent,
  },
  {
    path:'about-us',
    component:AboutComponent,
  },
  {
    path:'contact',
    component:ContactComponent,
  },
  {
    path:'sign-in',
    component: SigninComponent,
  },
  {
    path:'sign-up',
    component: SignupComponent,
  },
  {
    path:'event',
    component: EventsComponent,
  },
  {
    path:'player1-list',
    component: PlayerListComponent,
  },
  {
    path:'view-profile/:playerId',
    component: ViewProfileComponent,
  },
  {
    path:'event-details/:eventId',
    component: EventDetailsComponent,
  },
  {
    path:'registration-form/:eventId/:userId',
    component: RegistrationFormComponent,
  },
  {
    path:'**',
    component:ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
