import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  Live_event: any[] = [];
  eventData: any;
  end_event: any[] = [];
  upcomming_event: any[] = [];
  date: any;
  nowDate: any;
  page: number = 1;
  count: number = 0;
  cardSize: number = 18;
  constructor(
    private _auth: UserAuthService,
    public spin: NgxSpinnerService,
    public _date_pipe: DatePipe,
    
  
    private _router: Router,
    private toast:ToastrService
  ) {}

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
    this.spin.show();
    this._auth.viewTournaments().subscribe(
      (data) => {
        this.spin.hide();
        this.eventData = data;

        for (let i = 0; i < this.eventData.length; i++) {
          if (this.eventData[i].tournamentStartDate < Date.now()) {
            this.end_event.push(this.eventData[i]);
          } else if (this.eventData[i].tournamentStartDate > Date.now()) {
            this.upcomming_event.push(this.eventData[i]);
            this.date = this.eventData[i].tournamentStartDate;
            this.nowDate = Date.now();
            console.log(this._date_pipe.transform(this.nowDate, 'dd-MM-yyyy'));
            console.log(this._date_pipe.transform(this.date, 'dd-MM-yyyy'));
          } else {
            this.Live_event.push(this.Live_event[i]);
          }
        }
        console.log('End event ', this.end_event);
        console.log('Upcomming event ', this.upcomming_event);
        console.log('Live event ', this.Live_event);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCardDataChange(event: any) {
    this.page = event;
  }
}
