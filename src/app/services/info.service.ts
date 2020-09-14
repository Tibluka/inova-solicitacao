import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';

interface arrayConsulta {
  codigo: number;
  data_criacao: Date;
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
  forma_entrega = 1
  opcoesEntrega: string[] = ['Retirar no cartório', 'Entregar no endereço'];
  arraySolicitacoes: arrayConsulta
  codigo_solicitacao: number = null
  base64 = []

  constructor(private apiService: ApiService, public loadingService: LoadingService, public router: Router) { }

  gerarPedido(inputs) {
    const data =
    {
      nome_partes: inputs.nome_partes,
      tipo_ato: inputs.tipo_ato,
      livro: inputs.livro_ato,
      folha: inputs.folha_ato,
      forma_entrega: this.forma_entrega,
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
        cpf_cnpj: inputs.cpf_cnpj.replace(/\D/g, ''),
        email: inputs.email,
        telefone: inputs.telefone.replace(/\D/g, '')
      },
      mensagem: inputs.mensagem
    }
    this.apiService.setHeader(this.access_token)
    console.log(data);
    this.apiService.postApi<any>('/solicitacoes', data).subscribe(result => {
      console.log(result)
      console.log(this.base64);
      this.uploadArquivo(result.solicitacao.codigo)

      this.router.navigate(['/finish/' + result.solicitacao.codigo])
      this.loadingService.isActive = false
    }, error => {
      this.loadingService.isActive = false
    })
  }

  uploadArquivo(userCode) {
    this.apiService.postFork('/solicitacoes/' + userCode + '/uploads', this.base64).subscribe(res => {
      console.log(res)
      this.loadingService.isActive = false
      this.router.navigate(['/finish/' + userCode])
    })
  }

  consultar(id) {
    this.loadingService.isActive = true
    this.apiService.setHeader(this.access_token)
    this.apiService.getApi('/solicitacoes/' + id).subscribe((res: arrayConsulta) => {
      this.arraySolicitacoes = res
      console.log(this.arraySolicitacoes)
      this.buscarSolicitacao = true
      this.temEndereco = true
      this.loadingService.isActive = false
    }, error => {
      this.loadingService.isActive = false
      this.temEndereco = false
      this.buscarSolicitacao = false
    })
  }
}