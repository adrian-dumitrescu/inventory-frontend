import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.model';
import { Subject } from 'rxjs';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1yy.0/me';
const GRAPH_ENDPOINT_PIC = 'https://graph.microsoft.com/v1.0/me/photo/$value';
// const REPORTS_API_BASE_URI='https://localhost:4200/api/'
@Injectable({
  providedIn: 'root'
})
export class AzureAdService {

  isUserLoggedIn:Subject<boolean> = new Subject<boolean>();
  
  constructor(private httpClient: HttpClient) { }

  public getUserProfile(){
    return this.httpClient.get<Profile>(GRAPH_ENDPOINT);
  }

  public getUserProfilePic(){
    return this.httpClient.get(GRAPH_ENDPOINT_PIC,{responseType:'blob'});
  }

  // public getReport()
  // {
  //   return this.httpClient.get(REPORTS_API_BASE_URI+'Report/GetReport',
  //     {responseType:'blob'});
  // }
  // public getReportStatus()
  // {
  //   return this.httpClient.get<any>(REPORTS_API_BASE_URI+'Report/GetReportStatus');
  // }
}
