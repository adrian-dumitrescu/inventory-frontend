import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
    
  }

  public login(){
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account)
    });
  }

  public loginRedirect(){
    this.msalService.loginRedirect();
  }

  public isLoggedIn(): boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }

}
