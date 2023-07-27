import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../model/card.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoardsService } from '../../boards.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {

  @Input() card?: Card;
  public showTitleInput: boolean;
  public titleFormControl: FormControl;

  private boardService: BoardsService = inject(BoardsService);

  constructor() {
    this.showTitleInput = true;
    this.titleFormControl = new FormControl(this.card?.title, {
      validators: [Validators.required],
    });
  }

  showTitleInputHandler(): void {
    this.showTitleInput = !this.showTitleInput;
  }

  updateCardTitle(): void {
    const newTitle = this.titleFormControl.value;
    if (this.card!.title !== newTitle) {
      this.boardService
        .updateCard({ ...this.card!, title: newTitle })
        .subscribe((response) => {
          if (response.success) {
            this.card = response.data;
            // this.board.columns.map((column) => {
            //   const index = column.cards.findIndex(
            //     (card) => card.id === response.data.id
            //   );
            //   column.cards[index] = response.data;
            // });
            // this.showTitleInputHandler();
          }
        });
    }
  }
}
