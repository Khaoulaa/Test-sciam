import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInformationComponent } from './components/item-information/item-information.component';



@NgModule({
  declarations: [
    ItemInformationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ItemInformationComponent
  ]
})
export class SharedModule { }
