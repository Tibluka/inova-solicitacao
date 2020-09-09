import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': ''
      }
    ),

  }

  postFork(params, data) {
    const chamada = data.map(res =>{
      return this.http.post(environment.url + params, res, this.httpOptions)
    })
    return forkJoin(chamada)
  }

  constructor(private http: HttpClient) {
  }

  getApi<T>(params): Observable<T> {
    return this.http.get<T>(environment.url + params, this.httpOptions)
  }

  postApi<T>(params, body): Observable<T> {
    return this.http.post<T>(environment.url + params, body, this.httpOptions)
  }

  setHeader(token) {
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': token,
          'cartorio': '3901e05b-eef0-11ea-924e-0af504ceb319'
        }
      ),
    }
  }
}



