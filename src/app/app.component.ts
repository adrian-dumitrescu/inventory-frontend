import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  currentAccount: AccountInfo | null = null;
  title = 'inventoryapp';
  isIframe = false;
  loginDisplay = false;
  files: any[] = [];
  accessToken: any;


  constructor(private msalService: MsalService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    if (this.isLoggedIn()) {
      console.log(this.accessToken);  // Log the access token
    }
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



  ngOnDestroy(): void {
    // private subscriptions: Subscription[] = [];
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



  // async fetchFiles2(): Promise<void> {

  //   this.msalService.acquireTokenSilent({ scopes: ['https://graph.microsoft.com/Sites.Read.All'] })
  //     .subscribe({
  //       next: (result: AuthenticationResult) => {
  //         const accessToken = result.accessToken;

  //         this.sharepointService.getSite(accessToken, 'https://microchiptechnology.sharepoint.com/').subscribe((response: any) => {
  //           const siteId = response.value[0].id;
  //           this.siteId = siteId;
  //         });
  //       },
  //       error: (error: any) => {
  //         console.error('Error acquiring token', error);
  //       }
  //     });

  //   // const accessToken = await this.msalService.acquireTokenSilent({
  //   //   scopes: ['https://graph.microsoft.com/.default'],
  //   // });

  // }

  // async fetchFiles(): Promise<void> {


  //   if (!this.currentAccount) {
  //     this.currentAccount = this.msalService.instance.getActiveAccount();

  //     if (!this.currentAccount) {
  //       // No active account, so prompt the user to sign-in
  //       this.msalService.loginRedirect();
  //       return;
  //     }
  //   }
   

  //   this.msalService.acquireTokenSilent({
  //     scopes: ['https://graph.microsoft.com/.default'],
  //     account: this.currentAccount
  //   }).subscribe({
  //     next: (result: AuthenticationResult) => {
  //       // Use the access token in result.accessToken to call your API
  //       const accessToken = result.accessToken;
  //       console.log(result.accessToken);  // Log the access token
  //       this.sharepointService.getSite(accessToken, 'https://microchiptechnology.sharepoint.com/sites/EUCAE').subscribe((response: any) => {
  //         const siteId = response.value[0].id;
  //         this.siteId = siteId;
  //         console.log("true")
  //       });
  //     },
  //     error: (error: any) => {
  //       console.error('Error acquiring token', error);
  //     }
  //   });
  // }

  public isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }



  public login() {
    // this.msalService.loginPopup()
    //     .subscribe({
    //         next: (result) => {
    //             console.log(result);
    //             this.setLoginDisplay();
    //         },
    //         error: (error) => console.log(error)
    //     });
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.currentAccount = response.account;
      this.accessToken = response.accessToken;
      console.log(this.accessToken);
      this.msalService.instance.setActiveAccount(this.currentAccount)
    });
    this.msalService.acquireTokenSilent({ scopes: ['https://graph.microsoft.com/.default'] })
      .subscribe({
        next: (result: AuthenticationResult) => {
          const accessToken = result.accessToken;
          console.log(accessToken);
        },
        error: (error: any) => {
          console.error('Error acquiring token', error);
        }
      });
    // window.location.reload();

  }

  public loginRedirect() {
    this.msalService.loginRedirect({
      scopes: ['https://graph.microsoft.com/.default'],
      prompt: 'consent'
    });
  }

  public setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }


  public logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.msalService.logout();
    window.location.reload();

  }

  get Username(): string {
    let userInfo: AccountInfo = this.msalService.instance.getAllAccounts()[0];

    return userInfo ? userInfo.username : "";
  }


}
