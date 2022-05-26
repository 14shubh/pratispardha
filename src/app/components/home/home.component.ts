import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  upcomming_event:any[]=[];
  live_event:any[]=[];
  end_event:any[]=[];
  eventData:any;
  date: any;
  nowDate: any;
  toggle = false;
  
  constructor(private activateRouter:ActivatedRoute,
    public spin: NgxSpinnerService
    
    ,private toast:ToastrService,private auth:UserAuthService,private _router: Router, public _date_pipe:DatePipe ) {
    
   }
   
  public AllEvents(){
    this._router.navigate(['event'])
  }
  public read(eventId:string){
    console.log(eventId);
    this._router.navigate(['event-details/'+eventId+"/"+1]);
  }
  public register(event:any){
    console.log(event)
    if((event.tournamentStartDate)>(new Date().getTime())){
    if((event.tournamentApplyDate)<(new Date().getTime())){
      if((event.tournamentEndDate)>(new Date().getTime())){

        this._router.navigate(['registration-form/'+event._id+"/"+sessionStorage.getItem('UserLoginId')]);
      }
      else
      this.toast.warning("Registration Closed");


    }
    else
      this.toast.info("Registration Is Not Start");
    }
    else
    this.toast.error("Tournament is Ended")

  }


 
  ngOnInit(): void {
    this.spin.show()
      this.auth.viewTournaments().subscribe(data=>{
      this.eventData=data

      for (let i = 0; i < this.eventData.length; i++) {
        if(this.eventData[i].tournamentStartDate < Date.now()){
          this.end_event.push(this.eventData[i]);
           this.spin.hide()
        }
        else if(this.eventData[i].tournamentStartDate > Date.now()){
          this.upcomming_event.push(this.eventData[i]);
          this.date = this.eventData[i].tournamentStartDate;
          this.nowDate = Date.now();
          console.log(this._date_pipe.transform(this.nowDate,'dd-MM-yyyy'))
          console.log(this._date_pipe.transform(this.date,'dd-MM-yyyy'));
        }else{
          this.live_event.push(this.live_event[i]);
        }
        
      }
      console.log('End event ',this.end_event)
      console.log('Upcomming event ',this.upcomming_event)
      console.log('Live event ',this.live_event)
       
    })
   }
  
 
}
 

