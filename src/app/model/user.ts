export class User {
 
    constructor(
        public name: string,
         public email: string,
         public password: string,
         public mobile:string,
          public playerType:string,
          public age :number|string,
          public address :string,
          public image:File|string,
          public description:string,
          public initialPrice:number|string,
          public playerId:string,
          public tournamentId:string,
          public teamId:string,
          public resquestId:string,
          public message:string
         
          ){
 
    }
}
 

