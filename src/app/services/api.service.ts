import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private httpOptions = {
    headers: new HttpHeaders(
      { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic NTZyODNnNHFmcG1lZHMxc3ZqN2tuYm80ODE6MWwzbWw1dWZjNDlsYmllMXZiODRqODZlOHRqNWZldjJob2sxM3E5Zmxmbm5kODBmazFsMg=='
      }
    ),
    
  }

 

  constructor(private http: HttpClient) {

  }

  getApi<T>(params): Observable<T> {
    return this.http.get<T>(environment.url + params,  this.httpOptions)
  }

  postApi<T>(params, body): Observable<T> {
    return this.http.post<T>(environment.url + params, body, this.httpOptions)
  }
  
  setHeader(token){
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token
        }
      ),
    }
  }
}



