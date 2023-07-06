import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { $user } from '../auth/store/user.store';
import { User } from '../auth/models/user.model';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { $boards } from './store/boards.store';
import { Board } from './model/board.model';
import { BoardsService } from './boards.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './boards.component.html',
})
export class BoardsComponent {
  private boardService: BoardsService = inject(BoardsService);

  public user!: User;
  public boards: Observable<Board[]>;

  constructor() {
    $user.subscribe((result) => (this.user = result));
    this.boardService.findByUser().subscribe((result) => {
      if (result.success) $boards.next(result.data);
    });

    this.boards = $boards.asObservable();
  }
}
