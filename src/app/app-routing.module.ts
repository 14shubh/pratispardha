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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { AuthGuard } from './auth.guard';
import { TournamentHistoryComponent } from './components/tournament-history/tournament-history.component';
import { ForgetPageComponent } from './components/forget-page/forget-page.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { TeamHistoryComponent } from './components/team-history/team-history.component';


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
    path:'player-list',
    component: PlayerListComponent,
  },
  {
    path:'view-profile/:playerId/:status',
    component: ViewProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'event-details/:eventId/:status',
    component: EventDetailsComponent,
  },
  {
    path:'registration-form/:eventId/:userId',
    component: RegistrationFormComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"profile",
    component:UserProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"tournament-history",
    component:TournamentHistoryComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'team',
    component: TeamHistoryComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "forget-password",
    component:ForgetPageComponent
  },
  {
    path:"new-password/:id",
    component:NewPasswordComponent
  },
  {
    path:'**',
    component:ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
