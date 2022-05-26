import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { User} from '../../model/user'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:User = new User('','','','','','','','','','','','','','');

  constructor(private _userAuth: UserAuthService,private toast:ToastrService, private _router: Router) { }

  public playerType(event:any){
     this.user.playerType = event.target.value;
     
  }
  public sign_in_page(){
    this._router.navigate(['sign-in']);
  }
  public SignUp(){
    if(this.user.playerType=="0")
    //  alert("Please Select the type")
    this.toast.info("Please Select The Type")
    console.log(this.user);
    this._userAuth.register(this.user).subscribe((data)=>{
      console.log(data);
      this.toast.success("Signup Success")
      this._router.navigate(['sign-in']);
    },(err)=>{
      console.log(err);
    })
  }
  
  ngOnInit(): void {
  }

}
