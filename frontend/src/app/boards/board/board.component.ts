import {
  CdkDragDrop,
  CdkDragPlaceholder,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { BoardsService } from '../boards.service';
import { ColumnComponent } from '../components/column/column.component';
import { Board } from '../model/board.model';
import { Card } from '../model/card.model';
import { Column } from '../model/column.model';
import { $columns } from '../store/columns.store';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkDragPlaceholder,
    NavbarComponent,
    ColumnComponent,
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private boardService: BoardsService = inject(BoardsService);

  public nameFormControl: FormControl;
  public titleFormControl: FormControl;
  public descriptionFormControl: FormControl;
  public board!: Board;
  public columns: Observable<Column[]>;
  public showCreateColumnInput: boolean;
  public showTitleInput: boolean;
  public showDescriptionInput: boolean;
  public selectedCard?: Card;
  public error: boolean;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')! as unknown as number;

    this.boardService.findById(id).subscribe((result) => {
      if (result.success) {
        this.board = result.data;

        $columns.next(result.data.columns);
      }
    });
    this.columns = $columns.asObservable();

    this.nameFormControl = new FormControl('', {
      validators: [Validators.required],
    });
    this.titleFormControl = new FormControl(this.selectedCard?.title, {
      validators: [Validators.required],
    });
    this.descriptionFormControl = new FormControl(this.selectedCard?.description, {
      validators: [Validators.required],
    });
    this.showCreateColumnInput = false;
    this.showTitleInput = false;
    this.showDescriptionInput = false;
    this.error = false;
  }

  showCreateColumnInputHandler(): void {
    this.showCreateColumnInput = true;
  }

  createColumn() {
    this.boardService
      .createColumn({
        boardId: this.board.id,
        name: this.nameFormControl.value,
      })
      .subscribe((result) => {
        if (result.success) {
          $columns.pipe(take(1)).subscribe((oldArray) => {
            const newArray = [...oldArray, result.data];
            $columns.next(newArray);
            this.nameFormControl.reset();
            this.showCreateColumnInput = false;
          });
        }
      });
  }

  drop(event: CdkDragDrop<Column[]>) {
    moveItemInArray(
      this.board.columns,
      event.previousIndex,
      event.currentIndex
    );
    this.board.columns.map((item, order) => {
      const column = this.board.columns.find(
        (column) => item.name === column.name
      );
      if (column) column.order = order;
    });

    this.boardService
      .updateColumnsOrder(this.board.columns)
      .subscribe((response) => {
        if (!response.success) this.error = true;
      });
  }

  setSelectedCard(event: Card): void {
    this.selectedCard = event;
    this.titleFormControl.setValue(event.title);
    this.descriptionFormControl.setValue(event.description);
  }

  updateCardPriority(newPriority: "LOW" | "MEDIUM" | "HIGH") {
    if (this.selectedCard?.priority !== newPriority) {
      this.boardService.updateCard({ ...this.selectedCard!, priority: newPriority }).subscribe(response => {
        if (response.success) {
          this.selectedCard = response.data;
          this.board.columns.map(column => {
            const index = column.cards.findIndex(card => card.id === response.data.id);
            column.cards[index] = response.data;
          })
        }
      })
    }
  }

  deleteColumn(id: number) {
    this.boardService.deleteColumn(id).subscribe(result => {
      if (result.success) {
        const index = this.board.columns.findIndex(column => column.id === id);
        this.board.columns.splice(index, 1);
      }
    })
  }

  showTitleInputHandler(): void {
    this.showTitleInput = !this.showTitleInput;
  }

  showDescriptionInputHandler(): void {
    this.showDescriptionInput = !this.showDescriptionInput;
  }

  updateCardTitle(): void {
    const newTitle = this.titleFormControl.value;
    if (this.selectedCard?.title !== newTitle) {
      this.boardService.updateCard({ ...this.selectedCard!, title: newTitle }).subscribe(response => {
        if (response.success) {
          this.selectedCard = response.data;
          this.board.columns.map(column => {
            const index = column.cards.findIndex(card => card.id === response.data.id);
            column.cards[index] = response.data;
          })
          this.showTitleInputHandler();
        }
      })
    }
  }

  updateCardDescription(): void {
    const newDescription = this.descriptionFormControl.value;
    if (this.selectedCard?.description !== newDescription) {
      this.boardService.updateCard({ ...this.selectedCard!, description: newDescription }).subscribe(response => {
        if (response.success) {
          this.selectedCard = response.data;
          this.showDescriptionInputHandler();
          this.board.columns.map(column => {
            const index = column.cards.findIndex(card => card.id === response.data.id);
            column.cards[index] = response.data;
          })
        }
      })
    }
  }
}
