import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  UserId:string="";
  constructor(private _activeRouter:ActivatedRoute) { 
    this.UserId = this._activeRouter.snapshot.params['id'];
    alert(this.UserId);
  }

  ngOnInit(): void {
  }

}
