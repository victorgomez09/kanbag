import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';

export const $user = new Subject<User>();
export const $usersAll = new BehaviorSubject<User[]>([]);
export const $members = new BehaviorSubject<User[]>([]);
