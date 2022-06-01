import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-forget-page',
  templateUrl: './forget-page.component.html',
  styleUrls: ['./forget-page.component.css']
})
export class ForgetPageComponent implements OnInit {
  email:string ="";
  status:boolean=true;
  constructor(private _userAuth: UserAuthService,private toast:ToastrService) { }

  sendMail(){
    
    console.log(this.email);
      this._userAuth.sendMail(this.email).subscribe(data=>{
        console.log(data);
        if(data.message=="User Not Found"){
          this.toast.warning("User is not find please enter ragistered email or signup")
        }
       else if(data.message="success"){
          this.status=false;
        }

        else if(data.message="Internal Server Error"){
          this.toast.error("Oops! Something went wrong");
        }
             },err=>{
        console.log(err);
      })
  }

  ngOnInit(): void {
  }

}
