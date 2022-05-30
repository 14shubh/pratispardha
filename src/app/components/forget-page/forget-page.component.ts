import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-forget-page',
  templateUrl: './forget-page.component.html',
  styleUrls: ['./forget-page.component.css']
})
export class ForgetPageComponent implements OnInit {
  email:string ="";
  status:boolean=true;
  constructor(private _userAuth: UserAuthService) { }

  sendMail(){
    this.status=false;
    console.log(this.email);
      this._userAuth.sendMail(this.email).subscribe(data=>{
        console.log(data);
      },err=>{
        console.log(err);
      })
  }

  ngOnInit(): void {
  }

}
