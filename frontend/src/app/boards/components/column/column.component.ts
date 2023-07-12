import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { BoardsService } from '../../boards.service';
import { Card } from '../../model/card.model';
import { Column } from '../../model/column.model';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, DragDropModule, ReactiveFormsModule],
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;
  @Output() newItemEvent = new EventEmitter<Card>();
  public nameFormControl: FormControl;
  public cards: Observable<Card[]>;
  public addNewCardToggle: boolean;
  public error: boolean;

  private boardService: BoardsService = inject(BoardsService);
  private $cards = new BehaviorSubject<Card[]>([]);

  constructor() {
    this.addNewCardToggle = false;
    this.nameFormControl = new FormControl('', {
      validators: [Validators.required],
    });
    this.cards = this.$cards.asObservable();
    this.error = false;
  }

  ngOnInit(): void {
    this.$cards.next(this.column.cards!);
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data.map((item, order) => {
        const card = this.column.cards?.find(
          (card) => item.title === card.title
        );
        if (card) card.order = order;
      });
      this.boardService
        .updateCardsOrder(event.container.data)
        .subscribe((response) => {
          if (!response.success) this.error = true;
        });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      event.container.data.map((item, order) => {
        const card = this.column.cards?.find(
          (card) => item.title === card.title
        );
        if (card) {
          card.order = order;
          card.columnId = Number(event.container.id);
        }
      });

      event.previousContainer.data.map((item, order) => {
        const card = this.column.cards?.find(
          (card) => item.title === card.title
        );
        if (card) card.order = order;
      });

      this.boardService
        .updateCardsOrderAndColumns({
          prevColumn: event.previousContainer.data,
          currentColumn: event.container.data,
        })
        .subscribe((response) => {
          if (!response.success) this.error = true;
        });
    }
  }

  addNewCardHandler(): void {
    this.addNewCardToggle = true;
  }

  addNewCard() {
    this.boardService
      .createCard({
        columnId: this.column.id!,
        title: this.nameFormControl.value,
      })
      .subscribe((response) => {
        if (response.success) {
          this.$cards.pipe(take(1)).subscribe((oldArray) => {
            if (!oldArray) {
              this.$cards.next([response.data]);
            } else {
              const newArray = [...oldArray, response.data];
              this.$cards.next(newArray);
            }
            this.nameFormControl.reset();
            this.addNewCardToggle = false;
          });
        }
      });
  }

  setSelectedCard(card: Card): void {
    this.newItemEvent.emit(card);
  }
}
