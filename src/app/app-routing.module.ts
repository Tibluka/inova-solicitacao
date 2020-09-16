import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmModalComponent } from './pages/solicitacao-form/confirm-modal/confirm-modal.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/solicitacao-form/solicitacao-form.module').then(m => m.SolicitacaoFormModule) },
  { path: 'consulta', loadChildren: () => import('./pages/consulta/consulta.module').then(m => m.ConsultaModule) },
  { path: 'finish/:id', loadChildren: () => import('./pages/finish/finish.module').then(m => m.FinishModule) },
  { path: 'confirm', component: ConfirmModalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
