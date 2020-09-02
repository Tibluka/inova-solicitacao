import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitacaoFormModule } from './solicitacao-form.module';
import { SolicitacaoFormComponent } from './solicitacao-form.component';

const routes: Routes = [
  { path: '' , component: SolicitacaoFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitacaoFormRoutingModule { }
