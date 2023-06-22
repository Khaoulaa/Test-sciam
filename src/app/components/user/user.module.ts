import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';


import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    UserRoutingModule,
    ScrollingModule
    
  ]
})
export class UserModule { }
