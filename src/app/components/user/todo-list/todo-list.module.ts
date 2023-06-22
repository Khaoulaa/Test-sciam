import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from 'app/core/core.module';


@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    TodoListRoutingModule
  ]
})
export class TodoListModule { }
