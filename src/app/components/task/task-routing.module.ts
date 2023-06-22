import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user/:id/task/edit-task/:idTask',
    loadChildren: () => import('./edit-task/edit-task.module').then(m => m.EditTaskModule)
  },
  {
    path: 'user/:id/task/add-task',
    loadChildren: () => import('./edit-task/edit-task.module').then(m => m.EditTaskModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
