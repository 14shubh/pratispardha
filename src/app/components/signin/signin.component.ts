// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserAuthService } from 'src/app/services/user-auth.service';
// import { User } from '../../model/user'
// import {SocialAuthService,GoogleLoginProvider} from 'angularx-social-login'
// import { HttpErrorResponse } from '@angular/common/http';
// import { ToastrService } from 'ngx-toastr';
 
// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.css']
// })
// export class SigninComponent implements OnInit {
 
//   constructor(private _userAuth: UserAuthService, private Toast:ToastrService,private _router: Router,private socialService:SocialAuthService) { }
  
//   showPassword:boolean = false;

//   public sign_up_page(){
//     this._router.navigate(['/sign-up']);
//   }
 
//   user:User = new User('','','','','','','','','','','','','','','');
 
//   public SignIn(){
//     this._userAuth.login(this.user).subscribe((data) => {
//       console.log(data)
//       if(data.message=="User Not Found"){
//         this.Toast.warning("User Not Found");
//         this._router.navigate(['/sign-up']);
        
//       }
//       if(data.message=='please verify your account'){
//         this.Toast.info("Please Complete Email Verification");
//       }
//       if(data.message=="Invalid credential"){
//         this.Toast.warning("Incorrect Password");
//       }
 
//       if(data.status){
//     sessionStorage.setItem('jwt_token',data.token);
//         sessionStorage.setItem('UserLoginId',data.result._id);
//         sessionStorage.setItem('user-profile',JSON.stringify(data.result))
//         this.Toast.success("login success")
//         console.log(data)
//          this._router.navigate(['home']);
//       } 
//       if(data.status=="401"){
//         this.Toast.error("Invalid Credentials");
//         console.log("not found")
//       }
        
//     },err=>{
//       if(err instanceof HttpErrorResponse){
//           if(err.status==500)
//             // window.alert("Internal Server Error");
//             alert("calleds")
//             this.Toast.warning("Internal Server Error")
//       }
//     })
//   }

//   public ShowPassword(){
//     this.showPassword = !this.showPassword;
    
//   }
//   public signinWithGoogle(){
//     this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
//     this.socialService.authState.subscribe(data=>{
//       console.log(data)
//       this._userAuth.signinWithGoogle(data.email).subscribe(userData=>{
//         console.log(data)
//         if(userData.status){
//           sessionStorage.setItem('jwt_token',userData.token);
//           sessionStorage.setItem('UserLoginId',userData.result._id);
//            this._router.navigate(['home']);
//         }else{
//           // alert("not found");
//           this.Toast.error("Not Found")
//         }
//         },err=>{
//           // alert("Email not found please Sign up");
//           this.Toast.error('Email Not Found Please Sign up')
//           this._router.navigate(["sign-up"]);
//         })
//     })
//   }
//   forget(){
//     this._router.navigate(['forget-password']);
//   }
//   ngOnInit(): void {
//   }
 
// }
 

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { User } from '../../model/user'
import {SocialAuthService,GoogleLoginProvider} from 'angularx-social-login'
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
 
@Component({
 selector: 'app-signin',
 templateUrl: './signin.component.html',
 styleUrls: ['./signin.component.css']
})
 
export class SigninComponent implements OnInit {
 @ViewChild('pass')pass:ElementRef|any
 constructor(private _userAuth: UserAuthService, private Toast:ToastrService,private _router: Router,private socialService:SocialAuthService) { }

 showPassword:boolean = false;
 
 public sign_up_page(){
   this._router.navigate(['/sign-up']);
 }
 user:User = new User('','','','','','','','','','','','','','','');
  status:boolean=false;
 public SignIn(){
   this._userAuth.login(this.user).subscribe((data) => {
     console.log(data)
     if(data.message=="User Not Found"){
       this.Toast.warning("User Not Found");
       this._router.navigate(['/sign-up']);
      
     }
     if(data.message=='please verify your account'){
       this.Toast.info("Please Complete Email Verification");
     }
     if(data.message=="Invalid credential"){
       this.Toast.warning("Incorrect Password");
     }
     if(data.status){
   sessionStorage.setItem('jwt_token',data.token);
       sessionStorage.setItem('UserLoginId',data.result._id);
       sessionStorage.setItem('user-profile',JSON.stringify(data.result))
       this.Toast.success("login success")
       console.log(data)
        this._router.navigate(['home']);
     }
     if(data.status=="401"){
       this.Toast.error("Invalid Credentials");
       console.log("not found")
     }
      
   },err=>{
     if(err instanceof HttpErrorResponse){
         if(err.status==500)
           // window.alert("Internal Server Error");
           alert("calleds")
           this.Toast.warning("Internal Server Error")
     }
   })
  
 }
 tab(){
 this.pass.nativeElement.focus();
     
 }
 onKeydown(e:any){
 let obj:any=document.getElementById('signin');
 console.log(obj.disabled)
 if(!obj.disabled){
   obj.click()
 }
 else
 this.status=true;
 
 }

 public ShowPassword(){
      this.showPassword = !this.showPassword;
      
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
         // alert("not found");
         this.Toast.error("Not Found")
       }
       },err=>{
         // alert("Email not found please Sign up");
         this.Toast.error('Email Not Found Please Sign up')
         this._router.navigate(["sign-up"]);
       })
   })
 }
 forget(){
   this._router.navigate(['forget-password']);
 }
 ngOnInit(): void {
 }
}
 
 

