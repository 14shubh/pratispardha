import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    noticfication:any[]=[];
    playerteamTournamentId:string[]=[];
    playerTeamTournamentDate:string[]=[];
    UserId = sessionStorage.getItem('UserLoginId');
    constructor(private _authenticate:AuthenticateService,private toast:ToastrService,private _user :UserAuthService,private _router:Router,private _activeRoute:ActivatedRoute) { }
  public isLoggedIn(): boolean {
    return this._authenticate.checkToken();
   }
 
   public signout(){
     sessionStorage.removeItem('jwt_token');
     this._router.navigate(['sign-in']);
   }
 
   public notify(notification:any){
    
    notification.classList.toggle('active');

    this._user.viewProfile(sessionStorage.getItem('UserLoginId')).subscribe(data=>{
      console.log('first data ',data.team);
      this.noticfication=[];

      for(let id of data.team){
        console.log("data: "+id.tournamentId._id+"    date: "+id.tournamentId.tournamentStartDate)
        this.playerteamTournamentId.push(id.tournamentId._id);
        this.playerTeamTournamentDate.push(id.tournamentId.tournamentStartDate);
      }
      

      for(let event of data.request){
        this._user.viewProfile(event.teamId.ownerId).subscribe(data=>{
          this.noticfication.push({_id:event._id,eventName:event.tournamentId.tournamentName,ownerName:data.name,ownerImage:data.image,teamId:event.teamId._id,tournamentId:event.tournamentId._id,tournamentStartDate:event.tournamentId.tournamentStartDate})
        }); 
      }
      
      console.log('second notification data ',this.noticfication)
    })
   }
    acceptRequest(request:any){
     
     console.log(request)
     if((request.tournamentStartDate)>(new Date()).getTime()){
       
       if((this.playerteamTournamentId.indexOf(request.tournamentId))==(-1)){
       

        if((this.playerTeamTournamentDate.indexOf(request.tournamentStartDate))==(-1)){
       

          this._user.acceptRequest(sessionStorage.getItem('UserLoginId'),request._id,request.teamId,request.tournamentId).subscribe(data=>{
      

            this.toast.success("Request Accepted");
            window.location.reload();
          })
        }
        else
        // alert("You Have Already book for this data with another tournament")
        this.toast.info("You have already book for this data with another tournament")
       }
       else
      //  alert("Your have Already join this Tournament With another Team");
       this.toast.info("You have already join this Tournament With another Team")
      
     }
     else{
       this.toast.warning("Tournament has Ended")
     }
   }

   public reject(requestId:any, index:any){
     if(confirm('are you sure you want to reject')){
      this._user.rejectRequest(this.UserId,requestId).subscribe(data=>{
        if(data){
          console.log("rejected");
          this.noticfication.splice(index,1);
        }else{
          console.log("not rejected");
        }
       },err=>{
        console.log(err);
       })
     }
   }

   public ownerProfile(ownerId:string){
    this._router.navigate(['view-profile/'+ownerId+'/'+false]);
   }

    public clearAll(){
      this.noticfication = [];
    }
  ngOnInit(): void {
    
  }
 
}
 
 
 

