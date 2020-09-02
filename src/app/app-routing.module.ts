import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'solicitacao', loadChildren: () => import('./pages/solicitacao-form/solicitacao-form.module').then(m => m.SolicitacaoFormModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
