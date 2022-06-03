import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  UserId:string="";
  password1:string='';
  password2:string='';
  constructor(private user:UserAuthService,private _router:Router,private Toast:ToastrService,private _activeRouter:ActivatedRoute) { 
    this.UserId = this._activeRouter.snapshot.params['id'];
    // alert(this.UserId);
  }
  updatePassword(){
    if(this.password1==this.password2){
      this.user.newPassword(this.UserId,this.password1).subscribe(data=>{
        if(data){
          this.Toast.success("Password Change Successfully");
          this._router.navigate(['sign-in']);
        }
      },
      err=>{
        alert("error");
        console.log(err);
      })


    }
    else
    alert("Password Mismatch")
  }

  ngOnInit(): void {
  }

}
