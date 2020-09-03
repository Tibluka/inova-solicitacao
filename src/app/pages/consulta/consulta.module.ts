import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { ConsultaComponent } from './consulta.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class ConsultaModule { }
