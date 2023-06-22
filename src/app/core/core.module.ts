import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    FilterPipe,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FilterPipe,
    HeaderComponent
  ],
  providers: [FilterPipe]
})
export class CoreModule { 
  static forRoot() {
    return {
      ngModule: CoreModule
    };
  }
}
