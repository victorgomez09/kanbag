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
  public board!: Board;
  public columns: Observable<Column[]>;
  public showCreateColumnInput: boolean;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')! as unknown as number;

    this.boardService.findById(id).subscribe((result) => {
      if (result.success) {
        console.log('board', result.data);
        this.board = result.data;
        $columns.next(result.data.columns);
        this.board.columns[0].cards = [
          {
            id: 1,
            name: 'Tes card',
            description: '',
          },
          {
            id: 2,
            name: 'Tes card 2',
            description: '',
          },
        ];
      }
    });
    this.columns = $columns.asObservable();

    this.nameFormControl = new FormControl('', {
      validators: [Validators.required],
    });
    this.showCreateColumnInput = false;
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.board.columns,
      event.previousIndex,
      event.currentIndex
    );
  }

  // dropGrid(event: CdkDragDrop<string[]>): void {
  //   moveItemInArray(
  //     this.board.columns,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }

  // drop(event: CdkDragDrop<Card[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     console.log('prev', event.previousContainer.data);
  //     console.log('next', event.container.data);
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }
}
