import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  url = 'https://viacep.com.br/ws/'

  constructor(private apiService: ApiService,
    public loadingService: LoadingService) { 

  }

  getCep(params){
    this.apiService.getCepApi(this.url + params + '/json').subscribe( res => {
      console.log(res);
    })
  }

}
