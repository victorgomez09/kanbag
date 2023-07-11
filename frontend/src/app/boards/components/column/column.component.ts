import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
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
  public cards: Observable<Card[]>;
  public addNewCardToggle: boolean;
  public nameFormControl: FormControl;

  private boardService: BoardsService = inject(BoardsService);
  private $cards = new BehaviorSubject<Card[]>([]);

  constructor() {
    this.addNewCardToggle = false;
    this.nameFormControl = new FormControl('', {
      validators: [Validators.required],
    });
    this.cards = this.$cards.asObservable();
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
      console.log('current', event.container.data);
      event.container.data.map((item, order) => {
        const card = this.column.cards?.find(card => item.title === card.title);
        if (card) card.order = order;
      })
      this.$cards.next(this.column.cards!)
      console.log('cards with updated index', this.column.cards);
      console.log('compare', event.container.data === this.column.cards)
      this.boardService.updateCardsOrder(event.container.data).subscribe(response => {
        if (response.message) this.$cards.next(response.data);
      })
    } else {
      console.log('prev', event.previousContainer.data);
      console.log('next', event.container.data);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addNewCardHandler(): void {
    this.addNewCardToggle = true;
  }

  addNewCard() {
    this.boardService.createCard({ columnId: this.column.id!, title: this.nameFormControl.value })
      .subscribe(response => {
        if (response.success) {
          // const newArray = [...this.column.cards, response.data]
          // this.column.cards = newArray;
          // this.nameFormControl.reset();
          // this.addNewCardToggle = false;
          console.log('response', response);

          this.$cards.pipe(take(1)).subscribe((oldArray) => {
            if (!oldArray.length) {
              this.$cards.next([response.data])
            } else {
              const newArray = [...oldArray, response.data];
              this.$cards.next(newArray);
            }
            this.nameFormControl.reset();
            this.addNewCardToggle = false;
          });
        }
      })
  }
}
