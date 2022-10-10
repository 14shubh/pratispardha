import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pratispardha_frontend';
  constructor(private router: Router,private toastr:ToastrService){}
  ngOnInit(): void {
    let router = this.router;
    if(sessionStorage.getItem('jwt_token'))
      window.onload = function(){
        router.navigate(['home']);
      }
  }
}
