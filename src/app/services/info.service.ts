import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

interface arrayConsulta {
  resumo: [
    {
      descricao: string;
      id: number;
      qtd: number;
    }
  ],
  solicitacoes: [
    {
      codigo: number;
      creation_date: string;
      folha_ato: string;
      forma_entrega: number;
      livro_ato: string;
      mensagem: string;
      nome_partes: string;
      solicitante: {
        email: string;
        nome: string;
        tipo_pessoa: string;
        numero_cpfcnpj: string;
        numero_ordem_cnpj: string;
        numero_digito_cpfcnpj: string;
        telefone: string;
      },
      status: string;
      tipo_ato: string;
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  access_token
  opcaoEntregaSelecionada: string = 'Retirar no cartório';
  opcoesEntrega: string[] = ['Retirar no cartório', 'Entregar no endereço'];
  arraySolicitacoes: arrayConsulta

  constructor(private apiService: ApiService) {}

  gerarPedido(){
   
    const data = 
    {
      nome_partes: "Carlos manuel, josélison",
      tipo_ato: "Tipo_1222",
      livro: "31",
      folha: "123",
      forma_entrega: 2,
      endereco: {
        cep: "02220070",
        logradouro: "R. Teste",
        numero: "12",
        complemento: "dfasddfs",
        bairro: "Vila cabanona",
        cidade: "São Paulo",
        uf: "SP"
      },
      dados_solicitante : {
        nome: "Carlos gomes",
        tipoPessoa: "F",
        numeroCpfCnpj: 41345243855,
        numeroOrdemCpfCnpj: 0,
        numeroDigitoCpfCnpj: 11,
        email: "teste@teste.com",
        telefone: 1112341234
      },
      mensagem: "Mensagem Exemplo"
    }
    this.apiService.setHeader(this.access_token)
    console.log(this.access_token);
    
    this.apiService.postApi<any>('dev/solicitacoes', data).subscribe(result => {
      console.log(result)
    })
  }


  consultar(){
    this.apiService.setHeader(this.access_token)
    this.apiService.getApi('dev/solicitacoes').subscribe((res: arrayConsulta) => {
      console.log(res.solicitacoes);
      this.arraySolicitacoes = res
    })
  }

}
