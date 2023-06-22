import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public backup: User[] = [];

  private api = 'http://localhost:3000/api';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(
    private httpClient: HttpClient
  ) { }

  public getUsers(page: number): Observable<any> {
    const params = new HttpParams({
      fromObject:{
        page: page
      }
    });

    return this.httpClient
               .get(`${this.api}/users`, {headers: this.headers, params});
  }

  public getUserById(id: number): Observable<any> {

    return this.httpClient
               .get(`${this.api}/users/${id}`, {headers: this.headers});
  }

}
