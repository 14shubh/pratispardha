import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event:any;
  status:any;

  constructor(private _activeRouter:ActivatedRoute,
   public spin: NgxSpinnerService,
      private _userAuth:UserAuthService, private _router:Router) {
        this.status=this._activeRouter.snapshot.params['status'];
        this.spin.show()
     this._userAuth.viewTournamentById(this._activeRouter.snapshot.params['eventId']).subscribe(data=>{
       this.spin.hide();
       console.log("data.............................")
       console.log(data);
           this.event=data;
     })
    
  }
  public register(eventId:string){
    this._router.navigate(['registration-form/'+eventId+"/"+sessionStorage.getItem('UserLoginId')]);
  }
  ngOnInit(): void {
  }

}
