import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishRoutingModule } from './finish-routing.module';
import { FinishComponent } from './finish.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    FinishComponent
  ],
  imports: [
    CommonModule,
    FinishRoutingModule,
    MatCardModule
  ]
})
export class FinishModule { }
