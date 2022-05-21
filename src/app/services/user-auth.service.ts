import { HttpClient } from '@angular/common/http';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Team } from '../model/team';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
 serverUrl:string="https://spardhaa.herokuapp.com"
//serverUrl:string="http://localhost:3000"
  constructor(private _http:HttpClient) { }

  public register(user:User):Observable<User> {
    let url=this.serverUrl + "/signup"
   return this._http.post<any>(url, user);
  }

  public login(user:User):Observable<any>{
    let url=this.serverUrl + "/signin"
    return this._http.post<any>(url,user);
  }
  public signinWithGoogle(email:String):Observable<any>{
    let url=this.serverUrl + "/signin-with-google"
    return this._http.post<any>(url,{email:email})
  }

  public playerList():Observable<any>{
    let url=this.serverUrl + "/view-players"
    return this._http.get<any>(url);
  }
  public updateProfile(fd:any):Observable<any>{
    let url=this.serverUrl + "/update-profile"
    return this._http.post<any>(url,fd);
  }
  public viewProfile(playerId:any):Observable<any>{
    let url=this.serverUrl + "/view-profile/"+playerId;
    return this._http.get<any>(url);
  }
  public requestPlayer(playerId:string,teamId:string,tournamentId:string):Observable<any>{
    let url=this.serverUrl + "/request-player/"+playerId+"/"+teamId+"/"+tournamentId;
    return this._http.get<any>(url);
  }
  public acceptRequest(playerId:any,requestId:any, teamId:any, tournamentId:any):Observable<any>{
    let url=this.serverUrl + "/accept-request/"+playerId+"/"+requestId+"/"+teamId+"/"+tournamentId;
    return this._http.get<any>(url);
  }
  public rejectRequest(playerId:any, resquestId:string):Observable<any>{
    let url=this.serverUrl + "/reject-request/"+playerId+"/"+resquestId;
    return this._http.get<any>(url);
  }
  public createTeam(name:string,owmerId:string):Observable<any>{
    let url=this.serverUrl + "/team/create-team";
    return this._http.post<any>(url,{name:name,ownerId:owmerId});
  }
  public viewTeamByTeamId(team:Team):Observable<any>{
    let url=this.serverUrl + "/team/view-team/"+team.teamId;
    return this._http.get<any>(url);
  }
  public viewTeamByOwnerId(ownerId:any):Observable<any>{
    let url=this.serverUrl + "/team/view-team-by-ownerId/"+ownerId;
    return this._http.get<any>(url);
  }
  public viewTeamList():Observable<any>{
    let url=this.serverUrl + "/team/view-team-list";
    return this._http.get<any>(url);
  }
  public viewTournaments():Observable<any>{
    let url=this.serverUrl + "/tournament/view-tournament";
    return this._http.get<any>(url);
  }
  public viewTournamentById(tournamentId:String):Observable<any>{
    let url=this.serverUrl + "/tournament/view-tournament/"+tournamentId;
    return this._http.get<any>(url);
  }
  public applyForTournament(teamId:string,tournamentId:string):Observable<any>{
    let url=this.serverUrl + "/tournament/apply-for-tournament"
    return this._http.post<any>(url,{tournamentId:tournamentId,teamId:teamId});
  }
  public createOrder(amount:any):Observable<any>
  {
    let url=this.serverUrl +"/payment/get-payment"
      return this._http.post<any>(url, {amount:amount});
  }
  public saveQuery(name:string,email:string,mobile:string,query:string):Observable<any>{
    let url=this.serverUrl+"/contact/contact";
    return this._http.post<any>(url,{name:name,email:email,mobile:mobile,query:query});

  }
}








