import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitacaoFormComponent } from './solicitacao-form.component';

const routes: Routes = [
  { path: '' , component: SolicitacaoFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitacaoFormRoutingModule { }
