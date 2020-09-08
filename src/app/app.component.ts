import { Component, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inova-pagamentos';

  get loading() {
    return this.loadingService.isActive
  }
  constructor(
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
