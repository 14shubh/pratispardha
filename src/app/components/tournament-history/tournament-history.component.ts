import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-tournament-history',
  templateUrl: './tournament-history.component.html',
  styleUrls: ['./tournament-history.component.css']
})
export class TournamentHistoryComponent implements OnInit {
 live:any[]=[];
 upcoming:any[]=[];
 ended:any[]=[];
  constructor(private auth:UserAuthService,private _router:Router) { }

  public read(eventId:string){
    console.log(eventId);
    this._router.navigate(['event-details/'+eventId+"/"+2]);
  }
  ngOnInit(): void {
    this.auth.viewProfile(sessionStorage.getItem('UserLoginId')).subscribe(data=>{
      console.log(data)
      for(let item of data.team){
        if(item.tournamentId.tournamentStartDate>new Date().getTime())
               this.upcoming.push(item.tournamentId);
               else if(item.tournamentId.tournamentStartDate<new Date().getTime())
               this.ended.push(item.tournamentId);
               else
               this.live.push(item.tournamentId);
      }
    },
    err=>{
      console.log(err);
    })
  }

}
