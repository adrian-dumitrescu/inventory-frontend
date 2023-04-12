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
    title = 'inventoryapp';
    isIframe = false;
    loginDisplay = false;

    constructor(private msalService: MsalService,
        private userService: UserService) {

    }
    
    ngOnInit(): void {
        this.isIframe = window !== window.parent && !window.opener;
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
          this.msalService.instance.setActiveAccount(response.account)
        });
    }

    public loginRedirect() {
        this.msalService.loginRedirect();
    }

    public setLoginDisplay() {
        this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
    }

    public logout() {
        sessionStorage.clear();
        localStorage.clear();
        this.msalService.logout();
        
    }




}
