import { BehaviorSubject, Subject } from 'rxjs';
import { Board } from '../models/board.model';

export const $boards = new BehaviorSubject<Board[]>([]);
