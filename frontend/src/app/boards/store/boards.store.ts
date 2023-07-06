import { BehaviorSubject, Subject } from 'rxjs';
import { Board } from '../model/board.model';

export const $boards = new BehaviorSubject<Board[]>([]);
