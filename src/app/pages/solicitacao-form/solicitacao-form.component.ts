import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { TokenService } from '../../services/token.service';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

interface tokenInterface {
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Component({
  selector: 'app-solicitacao-form',
  templateUrl: './solicitacao-form.component.html',
  styleUrls: ['./solicitacao-form.component.scss']
})

export class SolicitacaoFormComponent implements OnInit {

 
  profileForm = this.fb.group({
    nome_partes: ['asd'],
    tipo_ato: ['ads'],
    livro_ato: ['asd'],
    folha_ato: ['sad'],
    entrega: [this.infoService.opcaoEntregaSelecionada],
    cep: [''],
    endereco: [''],
    numero: [''],
    complemento: [''],
    bairro: [''],
    cidade: [''],
    estado: [''],
    nome: [''],
    cpf_cnpj: [''],
    email: ['', ([Validators.required, Validators.email])],
    telefone: ['sad'],
    mensagem: ['asd'],
  })

  constructor(private fb: FormBuilder, public infoService: InfoService, private cdr: ChangeDetectorRef, public tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.getToken().subscribe((result: tokenInterface) => {
      this.infoService.access_token = result.access_token
    })
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  public cpfcnpjmask = function (rawValue) {
    let numbers = rawValue.match(/\d/g);
    let numberLength = 0;
    if (numbers) {
      numberLength = numbers.join('').length;
    }
    if (numberLength <= 11) {
      return [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
    } else {
      return [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
    }
  }

  public phoneMask = function (rawValue){
    let numbers = rawValue.match(/\d/g);
    let numberLength = 0;
    
  }

  submit() {
    const data = this.profileForm.value
    this.infoService.gerarPedido(data)
  }

  onClick(info) {
    if (info === 'Entregar no endereço') {
      this.profileForm.controls['cep'].setValidators([Validators.required])
      this.profileForm.controls['endereco'].setValidators([Validators.required])
      this.profileForm.controls['numero'].setValidators([Validators.required])
      this.profileForm.controls['complemento'].setValidators([Validators.required])
      this.profileForm.controls['bairro'].setValidators([Validators.required])
      this.profileForm.controls['cidade'].setValidators([Validators.required])
      this.profileForm.controls['estado'].setValidators([Validators.required])
      console.log('endereço required');
    } else {
      this.profileForm.get('cep').clearValidators();
      this.profileForm.get('endereco').clearValidators();
      this.profileForm.get('numero').clearValidators();
      this.profileForm.get('complemento').clearValidators();
      this.profileForm.get('bairro').clearValidators();
      this.profileForm.get('cidade').clearValidators();
      this.profileForm.get('estado').clearValidators();
      this.profileForm.get('cep').updateValueAndValidity();
      this.profileForm.get('endereco').updateValueAndValidity();
      this.profileForm.get('numero').updateValueAndValidity();
      this.profileForm.get('complemento').updateValueAndValidity();
      this.profileForm.get('bairro').updateValueAndValidity();
      this.profileForm.get('cidade').updateValueAndValidity();
      this.profileForm.get('estado').updateValueAndValidity();
      console.log('endereço not required');
    }
    console.log(this.profileForm.valid)
  }


}
