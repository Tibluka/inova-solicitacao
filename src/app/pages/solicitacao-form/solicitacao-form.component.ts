import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { TokenService } from '../../services/token.service';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { ApiService } from 'src/app/services/api.service';
import { BuscaCepService } from 'src/app/services/busca-cep.service';

interface buscaCep {
  cep: string;
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string;
  uf: string
}

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

  get phoneMask() {
    return this.isPhone() ? '(00) 0000-00009' : '(00) 00000-0000'
  }

  profileForm = this.fb.group({
    nome_partes: [''],
    tipo_ato: [''],
    livro_ato: [''],
    folha_ato: [''],
    entrega: [1],
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
    mensagem: [''],
  })

  

  constructor(private fb: FormBuilder,
    public infoService: InfoService,
    private cdr: ChangeDetectorRef,
    public tokenService: TokenService,
    public loadingService: LoadingService,
    private apiService: ApiService,
    public buscaCepService: BuscaCepService) {
  }

  ngOnInit(): void {
    this.infoService.forma_entrega = 1
    this.infoService.opcaoEntregaSelecionada = 'Entregar no endereço'
    this.loadingService.isActive = true
    this.tokenService.getToken().subscribe((result: tokenInterface) => {
      this.infoService.access_token = result.access_token
      this.apiService.setHeader(result.access_token)
      this.loadingService.isActive = false
    })
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }



  isPhone() {
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

  getCep(params) {
    if (this.profileForm.get('cep').value.length === 8) {
      this.buscaCepService.calcularFrete(this.profileForm.get('cep').value)
      this.apiService.getCepApi(this.buscaCepService.url + params + '/json').subscribe((res: buscaCep) => {
        this.profileForm.get('logradouro').setValue(res.logradouro)
        this.profileForm.get('bairro').setValue(res.bairro)
        this.profileForm.get('cidade').setValue(res.localidade)
        this.profileForm.get('uf').setValue(res.uf)
      })
    }
  }

  handleFileChange(event) {
    const target = event.target
    const { files } = target /* ====  const files = target.files */
    for (let element of files) {
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = event => {
          const dataUri = event.target.result as string;
          const base64 = dataUri.replace(/^data:.+;base64,/, '')
          this.infoService.base64.push({
            nome_arquivo: element.name.toLowerCase(),
            base64 /* == base64: base64 */
          })  
        }
        reader.readAsDataURL(element)
      }
    }
  }

  submit() {
    this.loadingService.isActive = true
    this.infoService.gerarPedido(this.profileForm.value)
  }



  onClick(info) {
    if (info === 'Entregar no endereço') {
      this.profileForm.controls['cep'].setValidators([Validators.required])
      this.profileForm.controls['logradouro'].setValidators([Validators.required])
      this.profileForm.controls['numero'].setValidators([Validators.required])
      this.profileForm.controls['complemento'].setValidators([Validators.required])
      this.profileForm.controls['bairro'].setValidators([Validators.required])
      this.profileForm.controls['cidade'].setValidators([Validators.required])
      this.profileForm.controls['uf'].setValidators([Validators.required])
      this.profileForm.controls['entrega'].setValue(2)

    } else {
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
      this.profileForm.controls['entrega'].setValue(1)

    }
  }
}
