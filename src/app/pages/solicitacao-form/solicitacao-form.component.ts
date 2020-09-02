import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { FormBuilder } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-solicitacao-form',
  templateUrl: './solicitacao-form.component.html',
  styleUrls: ['./solicitacao-form.component.scss']
})
export class SolicitacaoFormComponent implements OnInit {

  profileForm = this.fb.group({
    nome_partes: [''],
    tipo_ato: [''],
    livro_ato: [''],
    folha_ato: [''],
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
    email: [''],
    telefone: [''],
    mensagem: [''],
  })

  constructor(private fb: FormBuilder, public infoService: InfoService) { }

  ngOnInit(): void {
    this.profileForm.valueChanges
      .subscribe(value => {
        console.log(value)
      });
  }

  submit() {
      console.log(this.profileForm.value);
  }

setEnderecoRequired(){
  this.profileForm.controls['cep'].setValidators([Validators.required])
  this.profileForm.controls['endereco'].setValidators([Validators.required])
  this.profileForm.controls['numero'].setValidators([Validators.required])
  this.profileForm.controls['complemento'].setValidators([Validators.required])
  this.profileForm.controls['bairro'].setValidators([Validators.required])
  this.profileForm.controls['cidade'].setValidators([Validators.required])
  this.profileForm.controls['estado'].setValidators([Validators.required])
}

}
