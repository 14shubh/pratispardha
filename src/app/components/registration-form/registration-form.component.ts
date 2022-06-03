import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/services/user-auth.service';
declare var Razorpay:any
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  eventId:string =""; userId:string = "";eventData:any;teamData:any;teamName:string="";flag:boolean=false;
  teamId:string='';tournamentIds:string[]=[];tournamentDates:string[]=[];teamNames:string[]=[];
 name:string='';email:string='';mobile:string='';canApply:boolean=false;
   constructor(private ngZone:NgZone ,
    public spin: NgxSpinnerService,

    private toast:ToastrService,private activateRouter:ActivatedRoute,private userAuth:UserAuthService,private router:Router) {
  }
  public   async ragisterForTournament(){
    if((this.tournamentIds.indexOf(this.eventId))==(-1)){
        if((this.tournamentDates.indexOf(this.eventData.tournamentStartDate.toString()))==(-1)){
          if((this.eventData.tournamentApplyDate)<=(new Date().getTime())){
            if((this.eventData.tournamentEndDate)>=(new Date().getTime())){
              this.userAuth.createOrder(this.eventData.tournamentFees).subscribe(data=>{
                var options = {
                  "key": "rzp_test_k45BWvh7O4E1Os",
                  "amount": "1000",
                  "currency": "INR",
                  "name": "Acme Corp",
                  "description": "Test Transaction",
                  "image": "https://example.com/your_logo",
                  "order_id": data.id,
                'handler':async (response:any)=>{
  
              if(!this.flag){
                        await  this.userAuth.createTeam(this.teamName,this.userId).subscribe(data=>{
                          this.toast.info("Created");
                          this.teamId=data._id;
                          this.flag=true;
                        this.userAuth.applyForTournament(this.teamId,this.eventId).subscribe(data=>{
                          this.toast.success("Success");
                          window.location.href ="https://pratispardha.herokuapp.com/home";
                         });
                })
                        }else{
                        this.userAuth.applyForTournament(this.teamId,this.eventId).subscribe(data=>{
                          this.toast.success("Success");
                          window.location.href ="https://pratispardha.herokuapp.com/home";
                        })
                      }
  
  
                    },
  
                  "prefill": {
                      "name": this.name,
                      "email": this.email,
                      "contact": this.mobile
                  },
                  "notes": {
                      "address": "Razorpay Corporate Office"
                  },
                  "theme": {
                      "color": "#3399cc"
                  }
  
              };
  
  
              var rzp1 = new  Razorpay(options);
              rzp1.on('payment.failed', function (response: { error: { code: any; description: any; source: any; step: any; reason: any; metadata: { order_id: any; payment_id: any; }; }; }){
          });
              rzp1.open()
  
            })
  
            }
            else
            this.toast.warning("Registration Closed");
          }
          else
          this.toast.info("Registration is not Start");
        }
        else
        this.toast.info("You have already registered with another tournament for this day");
     }
      else{
        this.toast.info("You have already registered your team in this tournament")
      }
  }
  checkTeam(){
    if((this.teamNames.indexOf(this.teamName))==(-1)){
     this.canApply=true;
    }
    else 
    this.canApply=false;
  }
  
  

  ngOnInit(): void {
    this.spin.show();
    this.eventId= this.activateRouter.snapshot.params['eventId'];
    this.userId= this.activateRouter.snapshot.params['userId'];
      this.userAuth.viewTournamentById(this.eventId).subscribe(data=>{
        this.eventData=data;
        this.userAuth.viewTeamByOwnerId(this.userId).subscribe(data=>{
          console.log(data)
          this.userAuth.viewProfile(this.userId).subscribe(data=>{
            console.log(data);

            this.teamData=data;
            this.name=data.name;
            this.email=data.email;
            this.mobile=data.mobile;
          });
          if(data.length>0){
            for(let event of data[0].tournaments){
              this.tournamentIds.push(event._id);
              this.tournamentDates.push(event.tournamentStartDate)
            }
            this.teamName=data[0].name;
            this.teamId=data[0]._id;
            this.flag=true;
            this.canApply=true;

      console.log("team is already found")
          }
          this.spin.hide();
        });
      });
      this.userAuth.viewTeamList().subscribe(data=>{
        console.log("Teams ..........................");
        for(let team of data){
          this.teamNames.push(team.name);
        }
        console.log(this.teamNames);
      })




  }


}


