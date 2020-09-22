import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { LoadingService } from './loading.service';

interface resCalcCep {
  Servicos: {
    cServico: [
      {
        Codigo: [
          string
        ],
        Valor: [
          number
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
  valor = 0
  valorServico = 67.20
  valorTotal = this.valorServico
  frete = 0

  constructor(private apiService: ApiService,
    public loadingService: LoadingService,
    private http: HttpClient) {
  }

  getCep(params) {
    this.apiService.getCepApi(this.url + params + '/json').subscribe(res => {
    })
  }

  calcularFrete(cepDestino) {
    this.loadingService.isActive = true
    this.apiService.getApiCep('/calculo-frete?cepOrigem=' +
      '05401450' +
      '&cepDestino=' +
      cepDestino).subscribe((res: resCalcCep) => {
        this.mostraValores = true
        this.loadingService.isActive = false
        this.valor = res.Servicos.cServico[0].Valor[0]
        
        this.calculaTotal(this.valor)
      })
  }

  calculaTotal(valorFrete) {
    let servico = this.valorServico
    this.frete = parseFloat(valorFrete.replace(',','.'))
    this.frete.toFixed(2)   
    this.valorTotal = servico += this.frete
  }

}
