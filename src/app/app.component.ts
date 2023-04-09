import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'inventoryapp';
  user: any;
  userInfo: any;
  isIframe = false;
  loginDisplay = false;
  particlesJS: any;

  constructor(private msalService: MsalService,
    private userService: UserService){
    
  }
  ngOnInit(): void {

    // console.log(this.isLoggedIn());
    // this.isIframe = window !== window.parent && !window.opener;
    // if(!this.isLoggedIn()){
    //   this.loginRedirect();
    // }
    
    // if(!this.isLoggedIn()){
    //   this.loginRedirect();
    // }

    // this.userService.getUser().subscribe(
    //   data => {
    //     this.userInfo = data;
    //   },
    //   error => {
    //     console.error('Error fetching user data:', error);
    //   }
    // );


    // this.userService.getUser().subscribe({
    //   next: (response: any)=>{
    //     this.user = response;
    //   },
    //   error: (errorResponse: HttpErrorResponse)=>{
    //     console.log(errorResponse.error.message);
    //   }
    // })
  }
    
 
  public isLoggedIn(): boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }


  public login(){
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account)
    });
  }

  public loginRedirect(){
    this.msalService.loginRedirect();
  }

  public setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }

  public logout(){
    this.msalService.logout();
  }

  

}
