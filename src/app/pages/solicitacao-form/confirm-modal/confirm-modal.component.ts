import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { BuscaCepService } from 'src/app/services/busca-cep.service';
import { InfoService } from 'src/app/services/info.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TokenService } from 'src/app/services/token.service';


interface tokenInterface {
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(public infoService: InfoService,
    public buscaCepService: BuscaCepService,
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    public loadingService: LoadingService,
    public tokenService: TokenService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.tokenService.getToken().subscribe((result: tokenInterface) => {
      this.infoService.access_token = result.access_token
      this.apiService.setHeader(result.access_token)
      this.loadingService.isActive = false
    })
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
    this.infoService.clicked = true
    this.infoService.gerarPedido(this.infoService.summaryCheck)
    this.dialogRef.close()
    this.loadingService.isActive = true
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
