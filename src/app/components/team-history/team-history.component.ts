import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-team-history',
  templateUrl: './team-history.component.html',
  styleUrls: ['./team-history.component.css']
})
export class TeamHistoryComponent implements OnInit {
  teams: any
  tournament: any
  teamName:any
  constructor(private _user: UserAuthService) { }


  ngOnInit(): void {
    console.log(sessionStorage.getItem('UserLoginId'));
    this._user.viewTeamByOwnerId(sessionStorage.getItem('UserLoginId')).subscribe(data => {
      if (data) {
        // console.log(data);
        this.teams = data;
        for(let i =0; i<this.teams.length; i++){
          this.teamName = this.teams[i];
          console.log(this.teamName);
        }
        
        this.tournament = this.teams[0].tournaments;
        console.log(this.tournament);
        
      }
    }, err => {
      console.log(err);
    })
  }

}
