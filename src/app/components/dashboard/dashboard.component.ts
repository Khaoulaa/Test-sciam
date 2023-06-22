import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//services
import { StorageService } from '@core/services/storage.service';
import { UserService } from '@core/services/user.service';
import { TaskService } from '@core/services/task.service';
//stores
import { UserStore } from '@core/stores/user.store';
import { TaskStore } from '@core/stores/task.store';
//models
import { Task } from '@core/models/task.model';
import { ResponseData } from '@core/models/responseData.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
  readonly TASKS_ID = 'tasks';

  private onDestroyUser$: Subject<boolean> = new Subject();
  public tasks: Task[] = [];
  public informationUsers: any;
  public informationsTasks: any;
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private taskService: TaskService,
    private userStore: UserStore,
    private taskStore: TaskStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.storageService.set(this.TASKS_ID, JSON.stringify([{name: 'task', description : 'des', status: 0, user_id: 1}]))
    this.getTasks();
  }
  getUsers() {
    this.userService.getUsers(1)
    .pipe(takeUntil(this.onDestroyUser$))
    .subscribe((response: ResponseData) => {
      //store list users for used in other page(list users)
      this.userStore.setUser(response);
      this.informationUsers = {
            label: "Users",
            value:  response.metadata.count,
            theme: 'bg-violet'
      }
    });
  }
  getTasks() {
    this.storageService.get(this.TASKS_ID).then(response => {
      //get tasks from local storage 
      this.tasks =  JSON.parse(response);
      if (this.tasks) {
        this.taskStore.setTask(this.tasks);
        this.informationsTasks = this.taskService.generateinformationsTasks(this.tasks);
      }
    });
  }
  redirectUsers() {
    this.router.navigate(['users']);
  }
  
  ngOnDestroy(): void {
    this.onDestroyUser$.next(true);
    this.onDestroyUser$.complete();
  }

}
