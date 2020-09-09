import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishRoutingModule } from './finish-routing.module';
import { FinishComponent } from './finish.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FinishComponent
  ],
  imports: [
    CommonModule,
    FinishRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class FinishModule { }
