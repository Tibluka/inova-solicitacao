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
        cpf_cnpj: string;
        telefone: string;
      },
      status: string;
      tipo_ato: string;
    }
  ],
  tipo_retirada: string;

}

interface tokenInterface {
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  buscarSolicitacao = false
  temEndereco = false
  access_token
  opcaoEntregaSelecionada: string = 'Retirar no cartório';
  opcoesEntrega: string[] = ['Retirar no cartório', 'Entregar no endereço'];
  arraySolicitacoes: arrayConsulta
  codigo_solicitacao: number

  constructor(private apiService: ApiService) { }

  gerarPedido(inputs) {
    const data =
    {
      nome_partes: inputs.nome_partes,
      tipo_ato: inputs.tipo_ato,
      livro: inputs.livro_ato,
      folha: inputs.folha_ato,
      forma_entrega: 2,
      endereco: {
        cep: inputs.cep,
        logradouro: inputs.logradouro,
        numero: inputs.numero,
        complemento: inputs.complemento,
        bairro: inputs.bairro,
        cidade: inputs.cidade,
        uf: inputs.uf
      },
      dados_solicitante: {
        nome: inputs.nome,
        cpf_cnpj: inputs.cpf_cnpj,
        email: inputs.email,
        telefone: inputs.telefone
      },
      mensagem: inputs.mensagem
    }
    this.apiService.setHeader(this.access_token)
    console.log(data);

    this.apiService.postApi<any>('dev/solicitacoes', data).subscribe(result => {
      console.log(result)
    })
  }

  consultar(id) {
    if (this.codigo_solicitacao == null || this.codigo_solicitacao == 0) {
      alert('Insira um código')
    } else {
      this.apiService.setHeader(this.access_token)
      this.apiService.getApi('dev/solicitacoes/' + id).subscribe((res: arrayConsulta) => {
        this.arraySolicitacoes = res
        console.log(this.arraySolicitacoes)
        this.buscarSolicitacao = true
        if(this.arraySolicitacoes.tipo_retirada === '1'){
          this.temEndereco = false
        }else if (this.arraySolicitacoes.tipo_retirada === '2'){
          this.temEndereco = true
        }
      })
    }

  }
}