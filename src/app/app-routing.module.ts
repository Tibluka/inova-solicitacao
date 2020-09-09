import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'solicitacao', loadChildren: () => import('./pages/solicitacao-form/solicitacao-form.module').then(m => m.SolicitacaoFormModule) },
  { path: 'consulta', loadChildren: () => import('./pages/consulta/consulta.module').then(m => m.ConsultaModule) },
  { path: 'finish/:id', loadChildren: () => import('./pages/finish/finish.module').then(m => m.FinishModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
