import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile.model';
import { AzureAdService } from 'src/app/services/azure-ad.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  loginDisplay = false;
  profile!: Profile;
  profilePic!: SafeResourceUrl;

  constructor(private msalService: MsalService, private azureAdService: AzureAdService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // // Option 1: Add a class to the body
    // document.body.classList.add('my-custom-body-class');

    // // Option 2: Change the body's style directly
    // document.body.style.backgroundColor = 'my-custom-color';
  }

  ngOnDestroy() {
    // private subscriptions: Subscription[] = [];
    this.subscriptions.forEach(sub => sub.unsubscribe());
    // // Option 1: Remove the class from the body
    // document.body.classList.remove('my-custom-body-class');

    // // Option 2: Revert the changes made to the body's style
    // document.body.style.backgroundColor = '';
  }


  public getProfile() {
    this.azureAdService.getUserProfile().subscribe(profileInfo=>{
      this.profile = profileInfo;
    })
  }

  public getProfilePicture() {
    this.azureAdService.getUserProfilePic().subscribe(response=>{
      var urlCreator = window.URL || window.webkitURL
      this.profilePic = this.domSanitizer.bypassSecurityTrustResourceUrl(urlCreator.createObjectURL(response));
    })
  }

  public loginPopup() {
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account)
    });
    // this.msalService.loginPopup()
    //         .subscribe({
    //             next: (result) => {
    //                 console.log(result);
    //                 this.setLoginDisplay();
    //             },
    //             error: (error) => console.log(error)
    //         });
  }

  public setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }

  public loginRedirect() {
    this.msalService.loginRedirect();
  }

  public isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  public logout() {
    this.msalService.logout();

    // Refresh the page
    window.location.reload();

  }

  get Username(): string {
    let userInfo: AccountInfo = this.msalService.instance.getAllAccounts()[0];

    return userInfo ? userInfo.username : "";
  }

}
