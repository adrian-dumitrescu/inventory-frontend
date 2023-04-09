import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerURL = environment.apiBaseUrl;

  constructor(private http: HttpClient,
    private msalService: MsalService) { }


  // public getUser(): Observable<any> {
  //   return this.http.get(`${this.apiServerURL}/api/user/name`);
  // }

  // public getUser(): Observable<any> {
  //   return this.http.get("http://localhost:8080/api/user/name", { withCredentials: true });
  // }
  getUser(): Observable<any> {
    return this.http.get('http://localhost:8080/api/user/name');
  }
  // getUser(): Observable<any> {
  //   const headers = { Authorization: `Bearer ${this.msalService.instance.getActiveAccount()?.idToken}` };
  //   return this.http.get('http://localhost:8080/api/user/name', { headers });
  // }
  
}
