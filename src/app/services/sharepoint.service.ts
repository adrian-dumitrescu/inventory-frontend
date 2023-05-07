import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharepointService {
  constructor(private http: HttpClient) {}

  getFiles(siteId: string, listId: string): Observable<any> {
    const endpoint = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items?expand=fields(select=FileRef)`;
    return this.http.get(endpoint);
  }

  getSite(accessToken: string, siteURL: string): Observable<any> {
    const endpoint = `https://graph.microsoft.com/v1.0/sites?search=${encodeURIComponent(siteURL)}`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    return this.http.get(endpoint, { headers });
  }

  getList(accessToken: string, siteId: string, listName: string): Observable<any> {
    const endpoint = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists?filter=startswith(displayName, '${listName}')`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    return this.http.get(endpoint, { headers });
  }
}
