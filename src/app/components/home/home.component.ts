import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    // Option 1: Add a class to the body
    document.body.classList.add('my-custom-body-class');

    // Option 2: Change the body's style directly
    document.body.style.backgroundColor = 'my-custom-color';
  }

  ngOnDestroy() {
    // Option 1: Remove the class from the body
    document.body.classList.remove('my-custom-body-class');

    // Option 2: Revert the changes made to the body's style
    document.body.style.backgroundColor = '';
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
