import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { TokenService } from '../../services/token.service';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';

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

get phoneMask(){
  return this.isPhone() ? '(00) 0000-00009' : '(00) 00000-0000'
}

  profileForm = this.fb.group({
    nome_partes: ['asd'],
    tipo_ato: ['ads'],
    livro_ato: ['asd'],
    folha_ato: ['sad'],
    entrega: [this.infoService.opcaoEntregaSelecionada],
    cep: [''],
    logradouro: [''],
    numero: [''],
    complemento: [''],
    bairro: [''],
    cidade: [''],
    uf: [''],
    nome: [''],
    cpf_cnpj: [''],
    email: ['', ([Validators.required, Validators.email])],
    telefone: [''],
    mensagem: ['asd'],
  })

  constructor(private fb: FormBuilder,
    public infoService: InfoService,
    private cdr: ChangeDetectorRef,
    public tokenService: TokenService,
    public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.isActive = true
    this.tokenService.getToken().subscribe((result: tokenInterface) => {
      this.infoService.access_token = result.access_token
      this.loadingService.isActive = false
    })
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  isPhone(){   
    return this.profileForm.get('telefone').value.length <= 10
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
  

  submit() {
    this.loadingService.isActive = true
    this.infoService.gerarPedido(this.profileForm.value)
  }

  onClick(info) {
    if (info === 'Entregar no endereço') {
      this.infoService.forma_entrega = 2
      this.profileForm.controls['cep'].setValidators([Validators.required])
      this.profileForm.controls['logradouro'].setValidators([Validators.required])
      this.profileForm.controls['numero'].setValidators([Validators.required])
      this.profileForm.controls['complemento'].setValidators([Validators.required])
      this.profileForm.controls['bairro'].setValidators([Validators.required])
      this.profileForm.controls['cidade'].setValidators([Validators.required])
      this.profileForm.controls['uf'].setValidators([Validators.required])
      console.log('endereço required');
    } else {
      this.infoService.forma_entrega = 1
      this.profileForm.get('cep').clearValidators();
      this.profileForm.get('logradouro').clearValidators();
      this.profileForm.get('numero').clearValidators();
      this.profileForm.get('complemento').clearValidators();
      this.profileForm.get('bairro').clearValidators();
      this.profileForm.get('cidade').clearValidators();
      this.profileForm.get('uf').clearValidators();
      this.profileForm.get('cep').updateValueAndValidity();
      this.profileForm.get('logradouro').updateValueAndValidity();
      this.profileForm.get('numero').updateValueAndValidity();
      this.profileForm.get('complemento').updateValueAndValidity();
      this.profileForm.get('bairro').updateValueAndValidity();
      this.profileForm.get('cidade').updateValueAndValidity();
      this.profileForm.get('uf').updateValueAndValidity();
      console.log('endereço not required');
    }
    console.log(this.profileForm.valid)
  }
}
