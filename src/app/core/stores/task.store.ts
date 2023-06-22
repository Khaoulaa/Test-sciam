import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Task } from "../models/task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskStore {

    private _task = new BehaviorSubject<Task[]>(null);
    public task$: Observable<any> = this._task.asObservable();
    private _informationTask = new BehaviorSubject<any>(null);
    public informationTask$: Observable<any> = this._informationTask.asObservable();
    public loaded: boolean = false ;

    setTask(tasks: Task[]) {
        this._task.next(tasks);
        this.loaded = true;
    }
    setInformationTask(informations: any) {
        this._informationTask.next(informations);
    }

}