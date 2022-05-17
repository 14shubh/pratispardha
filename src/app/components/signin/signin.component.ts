import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { User } from '../../model/user'
import {SocialAuthService,GoogleLoginProvider} from 'angularx-social-login'
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 
  constructor(private _userAuth: UserAuthService, private _router: Router,private socialService:SocialAuthService) { }
 
  public sign_up_page(){
    this._router.navigate(['/sign-up']);
  }
 
  user:User = new User('','','','','','','','','','','','','','');
 
  public SignIn(){
    this._userAuth.login(this.user).subscribe((data) => {
 
      if(data.status){
    sessionStorage.setItem('jwt_token',data.token);
        sessionStorage.setItem('UserLoginId',data.result._id);
        sessionStorage.setItem('user-profile',JSON.stringify(data.result))
       
         this._router.navigate(['home']);
      }else{
        console.log("not found")
      }
    },err=>{
      if(err instanceof HttpErrorResponse){
          if(err.status==500)
            window.alert("Internal Server Error");
      }
    })
  }
  public signinWithGoogle(){
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.socialService.authState.subscribe(data=>{
      console.log(data)
      this._userAuth.signinWithGoogle(data.email).subscribe(userData=>{
        console.log(data)
        if(userData.status){
          sessionStorage.setItem('jwt_token',userData.token);
          sessionStorage.setItem('UserLoginId',userData.result._id);
           this._router.navigate(['home']);
        }else{
          alert("not found");
        }
        },err=>{
          alert("Email not found please Sign up");
          this._router.navigate(["sign-up"]);
        })
    })
  }
  ngOnInit(): void {
  }
 
}
 

