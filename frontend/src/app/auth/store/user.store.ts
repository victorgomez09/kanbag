import { Subject } from 'rxjs';
import { User } from '../models/user.model';

export const $user = new Subject<User>();
