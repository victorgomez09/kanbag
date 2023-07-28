import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserState {

    private _user: WritableSignal<User> = signal({
        email: '',
        displayName: '',
        boards: [],
        enabled: false
    })
    private _users: WritableSignal<User[]> = signal([])

    public getUser(): User {
        return this._user();
    }

    public getUsers(): User[] {
        return this._users();
    }

    public setUser(data: User): void {
        this._user.set(data);
    }

    public setUsers(data: User[]): void {
        this._users.set(data);
    }
}