import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';
import { TokenService } from 'src/app/services/token.service';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

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
    private apiService: ApiService,
    public loadingService: LoadingService,
    private route: Router) { }

  ngOnInit(): void {
    this.loadingService.isActive = true
    const solicitationCode = this.activatedRoute.snapshot.paramMap.get("id")
    this.tokenService.getToken().subscribe((result: tokenInterface) => {
      this.infoService.access_token = result.access_token
      this.apiService.setHeader(result.access_token)
      this.infoService.consultar(solicitationCode)
    })
  }

  sendHome(){
    this.infoService.base64 = []
    this.route.navigate(['/'])
  }

}
