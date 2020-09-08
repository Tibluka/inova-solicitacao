import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { TokenService } from 'src/app/services/token.service';

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

  constructor(public infoService: InfoService, public tokenService: TokenService) { }

  ngOnInit(): void {
    this.infoService.buscarSolicitacao = false
    
    this.tokenService.getToken().subscribe((result: tokenInterface) => {
      this.infoService.access_token = result.access_token
      console.log(this.infoService.buscarSolicitacao);
      
 
   })
  }

}

