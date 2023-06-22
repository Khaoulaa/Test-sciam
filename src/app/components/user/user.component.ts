import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
//services
import { UserService } from '@core/services/user.service';
import { PerformanceService } from '@core/services/performance.service';
//store
import { TaskStore } from '@core/stores/task.store';
//model
import { ResponseData } from '@core/models/responseData.model';
import { Task } from '@core/models/task.model';
import { User } from '@core/models/user.model';

const MAX_ALLOWED_NODES = 300;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  
  readonly TODO = 0;
  readonly DONE = 1;

  @ViewChild('contentEl') contentEl: ElementRef;

  private onDestroyUser$: Subject<boolean> = new Subject();
  private onDestroyTask$: Subject<boolean> = new Subject();
  
  public users: User[] = [];
  public tasks: Task[]
  public page: number = 1;
  lastscrollTop = 0 ;
  constructor(
    private userService: UserService,
    private taskStore: TaskStore,
    private router: Router,
    private _performanceService: PerformanceService

  ) { }

  ngOnInit(): void {
    this.getlazyUsers();
    this.getTasks();
  }
  getTasks() {
    this.taskStore.task$
        .pipe(takeUntil(this.onDestroyTask$))
        .subscribe(response => {
          this.tasks = response;
        })
  }
  getlazyUsers() {
    this.userService
        .getUsers(this.page)
        .pipe(takeUntil(this.onDestroyUser$),delay(100))
        .subscribe((response: ResponseData) => {
          this.users = this.users.concat(response.data);
          this.page += 1;
        });
  }
  redirectToDoList(id: number) {

    this.router.navigate(['users/todo-list/' + id]);
  }
  onScroll(event: any) {
  
    let st = event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) ;
    if ( st >= 1 ) {
      // load data user
      this.getlazyUsers();
      this.verifyPerfWhenDOwn();
      this.lastscrollTop = st;
    } 

    if (st < this.lastscrollTop && st <= 0) {
      this.verifyPerfWhenUp();
      const firstUsers = this.userService.backup.splice(-10);
      this.users = firstUsers.concat(this.users);
     this.contentEl.nativeElement.scrollTo(0, 100);
    }
  }
  verifyPerfWhenDOwn() {
    this._performanceService.getNodeCount().subscribe((nodeCount) => {
      if (nodeCount >= MAX_ALLOWED_NODES) {
          const removed = this.users.splice(0, 10);
          this.userService.backup =  this.userService.backup.concat(removed) ;
      }
    });
  }
  verifyPerfWhenUp(){
      this._performanceService.getNodeCount().subscribe((nodeCount) => {
        if (nodeCount === MAX_ALLOWED_NODES) {
           this.users.splice(-10);
           this.page--;
  
        }
      });
  }
  ngOnDestroy() {
    this.onDestroyTask$.next(true);
    this.onDestroyUser$.next(true);
  }
}
