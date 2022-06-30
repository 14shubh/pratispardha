import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-uper-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  UserProfile: any;
  isDisabled: boolean = true;
  name: string = '';
  email: string = '';
  mobile: string = '';
  age: string = '';
  description: string = '';
  playerType: string = '';
  address: string = '';
  image: any = undefined;
  constructor(private _user: UserAuthService) {


  }
  selectFile() {
    console.log('selectFile');
    let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    element.click();
  }

  async uploadImage(event: any) {
    console.log("called.....................")
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      console.log(this.image);
      await this.update();
      this.ngOnInit();
    }
  }


  public status(isDisabled: any) {
    if (isDisabled) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }
  update() {
    let fd = new FormData();
    fd.append("name", this.name);
    fd.append("email", this.email);
    fd.append("mobile", this.mobile);
    fd.append("address", this.address);
    fd.append("oldImage", this.UserProfile.image);
    fd.append("age", this.age);
    fd.append("image", this.image)
    fd.append("description", this.description);
    fd.append("playerType", this.playerType);
    fd.append("playerId", this.UserProfile._id);
    this._user.updateProfile(fd).subscribe(data => {
      console.log(data);
      this.isDisabled = true;

      this.ngOnInit();
    })

  }


  ngOnInit(): void {
    this._user.viewProfile(sessionStorage.getItem('UserLoginId')).subscribe(data => {
      console.log("data is coming");
      console.log(data)
      this.UserProfile = data;
      console.log(this.UserProfile.image);
      this.name = this.UserProfile.name;
      this.email = this.UserProfile.email;
      this.mobile = this.UserProfile.mobile;
      this.address = this.UserProfile.address;
      this.age = this.UserProfile.age;
      this.playerType = this.UserProfile.playerType;
      this.description = this.UserProfile.description;


    })
  }

  public IsImage(){
    if (this.UserProfile.image == ""){
      return false;
    }
    else{
      return true;
    }
  }

}
