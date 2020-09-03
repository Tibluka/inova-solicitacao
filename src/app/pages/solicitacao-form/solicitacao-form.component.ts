import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { TokenService } from '../../services/token.service';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

interface tokenInterface{
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Component({
  selector: 'app-solicitacao-form',
  templateUrl: './solicitacao-form.component.html',
  styleUrls: ['./solicitacao-form.component.scss']})

export class SolicitacaoFormComponent implements OnInit {

  profileForm = this.fb.group({
    nome_partes: ['asd'],
    tipo_ato: ['ads'],
    livro_ato: ['asd'],
    folha_ato: ['sad'],
    entrega: [this.infoService.opcaoEntregaSelecionada],
    cep: ['sad'],
    endereco: [''],
    numero: [''],
    complemento: [''],
    bairro: [''],
    cidade: [''],
    estado: [''],
    nome: ['sad'],
    cpf_cnpj: [''],
    email: ['sad'],
    telefone: ['sad'],
    mensagem: ['asd'],
  })

  constructor(private fb: FormBuilder, public infoService: InfoService,  private cdr: ChangeDetectorRef, public tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.getToken().subscribe((result: tokenInterface) => {
      console.log(result)
      this.infoService.access_token = result.access_token
    })
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  submit() {
    this.infoService.gerarPedido()
  }

  onClick(info) {
    if (info === 'Entregar no endereço') {
      debugger
      this.profileForm.controls['cep'].setValidators([Validators.required])
      this.profileForm.controls['endereco'].setValidators([Validators.required])
      this.profileForm.controls['numero'].setValidators([Validators.required])
      this.profileForm.controls['complemento'].setValidators([Validators.required])
      this.profileForm.controls['bairro'].setValidators([Validators.required])
      this.profileForm.controls['cidade'].setValidators([Validators.required])
      this.profileForm.controls['estado'].setValidators([Validators.required])
      console.log('endereço required');
      
    }else{
      debugger
      this.profileForm.controls['cep'].setValidators([])
      this.profileForm.controls['endereco'].setValidators([])
      this.profileForm.controls['numero'].setValidators([])
      this.profileForm.controls['complemento'].setValidators([])
      this.profileForm.controls['bairro'].setValidators([])
      this.profileForm.controls['cidade'].setValidators([])
      this.profileForm.controls['estado'].setValidators([])
    
      console.log('endereço not required');
      
    }


    console.log(this.profileForm.valid)



  }


}
