import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';
import { TokenService } from 'src/app/services/token.service';
import { ApiService } from 'src/app/services/api.service';

interface tokenInterface {
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    public infoService: InfoService,
    private tokenService: TokenService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    const userCode = this.activatedRoute.snapshot.paramMap.get("id")
    this.tokenService.getToken().subscribe((result: tokenInterface) => {
      this.infoService.access_token = result.access_token
      console.log(this.infoService.access_token);
      this.apiService.setHeader(result.access_token)
      this.infoService.consultar(userCode)
    })
  }

}
