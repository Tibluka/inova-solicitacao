import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { TokenService } from 'src/app/services/token.service';
import { LoadingService } from 'src/app/services/loading.service';

interface tokenInterface{
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})

export class ConsultaComponent implements OnInit {

  constructor(public infoService: InfoService, public tokenService: TokenService, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.infoService.buscarSolicitacao = false
    this.loadingService.isActive = true
    this.tokenService.getToken().subscribe((result: tokenInterface) => {      
      this.infoService.access_token = result.access_token
      this.loadingService.isActive = false
    })
  }

     
  isCPF(cpf_cnpj): string {
    return  cpf_cnpj && cpf_cnpj.length < 12 ? '000.000.000-009' : '00.000.000/0000-00';
  }

  get cpf_cnpj(){
    return this.infoService.cpfSolicitacao
  }



}

