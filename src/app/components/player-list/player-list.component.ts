import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Ng2SearchPipe} from 'ng2-search-filter'
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
declare const annyang: any;
@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
 status:boolean=true;
  searchTerm='';
  term=''
  page: number = 1;
  count: number = 0;
  cardSize: number = 18
  playerList:any;
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;

  constructor(private _userAuth: UserAuthService,private toast:ToastrService,private ngZone: NgZone,private Spin:NgxSpinnerService, private _router: Router) { 
    this.Spin.show()
    this._userAuth.playerList().subscribe(data =>{
      this.playerList = data
      this.Spin.hide()
      },err => {
        console.log(err);
      }) 
  }

  

  public profile(playerId:string){
    console.log(playerId)
    this._router.navigate(['view-profile/'+playerId+'/'+true]);
    
  }


  onCardDataChange(event: any) {
    this.page = event;
  }

  


  ngOnInit(): void {
  }


  voice(){
    if(this.status){
      this.toast.success("MIKE IS ON");
      this.status=false;
      this.startVoiceRecognition();
    }else{
      this.toast.success("MIKE IS OFF");
      this.status=true;
      this.closeVoiceRecognition();
    }

  }





  initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err: any) => {
      if(err.error === 'network'){
        this.voiceText = "Internet is require";
        this.searchTerm=this.voiceText;
      console.log(this.voiceText);

        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res:any) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid: any) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false);

			let queryText: any = userSaid[0];
      

			annyang.abort();

      this.voiceText = queryText;
      console.log(this.voiceText);
      this.term=this.voiceText;

			this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
		});
	}

	startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;

		if (annyang) {
			let commands = {
				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;
		this.voiceText = undefined;
    this.searchTerm="";

		if(annyang){
      annyang.abort();
    }
	}
}























