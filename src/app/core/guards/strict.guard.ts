import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskStore } from '../stores/task.store';

@Injectable({
  providedIn: 'root'
})
export class StrictGuard implements CanActivate {
  constructor(
    private taskStore: TaskStore,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.taskStore.loaded) {
      this.router.navigate(['/']);

      return false ;
    }

    return true;
  }
  
}
