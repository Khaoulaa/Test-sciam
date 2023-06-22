import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@core/models/user.model';
import { Task } from '@core/models/task.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], field: string, value: number): any[] {
    if (!array) {

      return [];
    }

   return array.filter(element => element[field] === value);
  }

}
