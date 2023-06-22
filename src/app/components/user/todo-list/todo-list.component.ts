import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//service
import { UserService } from '@core/services/user.service';
import { TaskService } from '@core/services/task.service';
import { StorageService } from '@core/services/storage.service';
//pipe
import { FilterPipe } from '@core/pipes/filter.pipe';
//model
import { Task } from '@core/models/task.model';
import { User } from '@core/models/user.model';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  readonly TASKS_ID = 'tasks';
  readonly TODO = 0;
  readonly DONE = 1;

  private onDestroyUser$: Subject<boolean> = new Subject();

  public user: User;
  public tasks: Task[];
  public informationsTask: any;
  public idUser: number;

  constructor(
    private routerActivate: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private taskService: TaskService,
    private storageService: StorageService,
    private filterPipe: FilterPipe
  ) { }

  ngOnInit(): void {
    this.idUser = this.routerActivate.snapshot.params['id'];
    this.getUser(this.idUser);
    this.getTasks(this.idUser);
  }
  getUser(idUser: number) {
    this.userService
        .getUserById(idUser)
        .pipe(takeUntil(this.onDestroyUser$))
        .subscribe((user: User) => {
          this.user = user;
        });

  }
  getTasks(idUser: number) {
    this.storageService
        .get(this.TASKS_ID)
        .then((response : string) => {
          this.tasks = JSON.parse(response);
          const tasksByUser = this.filterPipe.transform(this.tasks, 'user_id', Number(idUser));
          this.informationsTask =  this.taskService.generateinformationsTasks(tasksByUser);
        });
  }
  createNewTask(idUser: number) {
    this.router.navigate(['user/'+ idUser +'/task/add-task'])
  }
  editTask(idUser: number, idTask: number){
    this.router.navigate(['user/'+ idUser +'/task/edit-task' + '/' + idTask]);
  }
  changeStatus(task: Task, index: number) {
    console.log(index)
    this.tasks[index] = {
      ...task, ...{
        status: task.status === 0 ? 1 : 0 
      }
    };
    this.storageService.set(this.TASKS_ID, JSON.stringify(this.tasks));
  }

}
