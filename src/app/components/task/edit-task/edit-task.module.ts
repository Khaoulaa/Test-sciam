import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditTaskRoutingModule } from './edit-task-routing.module';
import { EditTaskComponent } from './edit-task.component';


@NgModule({
  declarations: [
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditTaskRoutingModule
  ]
})
export class EditTaskModule { }
