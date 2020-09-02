import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  getApi<T>(params): Observable<T> {
    return this.http.get<T>(environment.url + params)
  }

  postApi<T>(params, body): Observable<T> {
    return this.http.post<T>(environment.url + params, body)
  }

}



