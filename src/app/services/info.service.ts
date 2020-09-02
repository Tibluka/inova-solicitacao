import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InfoService {

  opcaoEntregaSelecionada: string = 'Retirar no cartório';
  opcoesEntrega: string[] = ['Retirar no cartório', 'Entregar no endereço'];

  constructor() {}
}
