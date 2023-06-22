import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ResponseData } from "../models/responseData.model";

@Injectable({
    providedIn: 'root'
})
export class UserStore {

    private _user = new BehaviorSubject<ResponseData>(null);
    public user$: Observable<any> = this._user.asObservable();
    public loaded = false;

    setUser(users:ResponseData) {
        this._user.next(users);
        this.loaded = true;
    }

}