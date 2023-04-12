import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.model';
const GRAPH_ENDPOINT = 'https//graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_PIC = 'https//graph.microsoft.com/v1.0/me/photo/$value';
@Injectable({
  providedIn: 'root'
})
export class AzureAdService {

  constructor(private httpClient: HttpClient) { }

  public getUserProfile(){
    return this.httpClient.get<Profile>(GRAPH_ENDPOINT);
  }

  public getUserProfilePic(){
    return this.httpClient.get(GRAPH_ENDPOINT_PIC,{responseType:'blob'});
  }
}
