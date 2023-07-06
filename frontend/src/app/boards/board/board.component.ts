import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsService } from '../boards.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../model/board.model';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './board.component.html',
})
export class BoardComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private boardService: BoardsService = inject(BoardsService);

  public board!: Board;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')! as unknown as number;
    console.log(id);
    this.boardService.findById(id).subscribe((result) => {
      if (result.success) this.board = result.data;
    });
  }
}
