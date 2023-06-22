import { Injectable } from '@angular/core';
import { Task } from '@core/models/task.model';
import { FilterPipe } from '@core/pipes/filter.pipe';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly TODO = 0;
  readonly DONE = 1;

  constructor(
    private filterPipe: FilterPipe
  ) { }

  generateinformationsTasks(tasks: Task[]) {

    return {
      all: {
        label: "Tasks",
        value: tasks.length,
        theme: "bg-pink"
      },
      done: {
        label: "Finished",
        value: this.filterPipe.transform(tasks, 'status', this.DONE).length,
        theme: "bg-green"
      },
      todo: {
        label: "Unfinished",
        value: this.filterPipe.transform(tasks, 'status', this.TODO ).length,
        theme: "bg-orange"
      }
    };
  }
}
