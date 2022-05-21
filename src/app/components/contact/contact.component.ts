import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name:string="";
  email:string='';
  mobile:string='';
  query:string='';



  constructor( private _user:UserAuthService) { }
  save(){
    this._user.saveQuery(this.name,this.email,this.mobile,this.query).subscribe(data=>{
      alert("Success");
      this.name='';
      this.email='';
      this.mobile='';
      this.query='';
    }
    ,err=>{
      console.log(err);
    })

  }

  ngOnInit(): void {
  }

}
