import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { LoadingService } from './loading.service';

interface resCalcCep{
  Servicos: {
    cServico: [
      {
        Codigo: [
          string
        ],
        Valor: [
          string
        ],
        PrazoEntrega: [
          number
        ],
        ValorSemAdicionais: [
          string
        ],
        ValorMaoPropria: [
          string
        ],
        ValorAvisoRecebimento: [
          string
        ],
        ValorValorDeclarado: [
          string
        ],
        EntregaDomiciliar: [
          string
        ],
        EntregaSabado: [
          string
        ],
        obsFim: [
          string
        ],
        Erro: [
          string
        ],
        MsgErro: [
          string
        ]
      }
    ]
  }
}

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  url = 'https://viacep.com.br/ws/'
  mostraValores = false
  valor = ''

  constructor(private apiService: ApiService,
    public loadingService: LoadingService,
    private http: HttpClient) {

  }

  getCep(params) {
    this.apiService.getCepApi(this.url + params + '/json').subscribe(res => {
      console.log(res);
    })
  }

  calcularFrete(cepDestino) {
    this.loadingService.isActive = true
    this.apiService.getApiCep('/calculo-frete?cepOrigem=' +
      '05311900' +
      '&cepDestino=' +
      cepDestino).subscribe((res: resCalcCep) => {
        this.mostraValores = true
        this.loadingService.isActive = false
        console.log(res.Servicos.cServico[0].Valor)
        this.valor = res.Servicos.cServico[0].Valor as any
      })
  }



}
