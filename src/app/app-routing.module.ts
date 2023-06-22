import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskModule } from './components/task/task.module';
import { StrictGuard } from './core/guards/strict.guard';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'users', 
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
    canActivate: [StrictGuard]
  },
  { 
    path: 'users/todo-list/:id', 
    loadChildren: () => import('./components/user/todo-list/todo-list.module').then(m => m.TodoListModule)
  },
  { 
    path: 'task/add', 
    loadChildren: () => import('./components/user/todo-list/todo-list.module').then(m => m.TodoListModule),
    canActivate: [StrictGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    TaskModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
