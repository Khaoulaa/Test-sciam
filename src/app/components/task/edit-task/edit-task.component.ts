import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StorageService } from '@core/services/storage.service';
import { TaskStore } from '@core/stores/task.store';

import { EditTaskFormGroup } from '@core/interfaces/forms/editTask.interface';
import { Task } from '@core/models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  
  readonly TASKS_ID = 'tasks';

  public editTaskForm : FormGroup;
  public idTask : number;
  public idUser: number;
  public successMsg: boolean = false;
  public tasks : Task[];
  public task: Task;
  constructor(
    private routerActivate: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private taskStore: TaskStore

  ) { }

  ngOnInit(): void {
    this.idUser = this.routerActivate.snapshot.params['id'];
    this.idTask = this.routerActivate.snapshot.params['idTask'] ? this.routerActivate.snapshot.params['idTask'] : null;
    this.initFormEditTask();
    this.storageService.get(this.TASKS_ID)
    .then((response: string) => {
      this.tasks = JSON.parse(response);
      this.task = this.tasks.find((element: Task )=>  element.id === Number(this.idTask));
      if(this.idTask !== null) {
       this.patchFormTask(this.task);
      }
    });


  }
  
  patchFormTask(task: Task) {
    this.editTaskForm.patchValue({
      name: task.name,
      description: task.description
    });
  }
  initFormEditTask() {
    this.editTaskForm = new FormGroup<EditTaskFormGroup>({
      name: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>('', { nonNullable: true})
    });
  }
  onSubmitEditTaskForm(currentTasks: Task[], task:Task) {
    if (!this.idTask) {
      currentTasks.push(
        {
          ...task,
          ...this.editTaskForm.value,
          id : this.idTask === null ?  currentTasks.length + 1  : Number(this.idTask),
          status: 0,
          user_id: Number(this.idUser)
        }
      );
    } else {
      const index = currentTasks.findIndex((element: Task) => element.id === task.id );
      currentTasks[index] = {
          ...task,
          ...this.editTaskForm.value,
          user_id: Number(this.idUser)
        
      };
      console.log('innn', currentTasks)
    }
    console.log(currentTasks)
   
    this.storageService.set(this.TASKS_ID, JSON.stringify(currentTasks));
    this.taskStore.setTask(currentTasks);
    this.successMsg = true;
    this.router.navigate(['/users/todo-list/' + this.idUser]);
  }

}
