import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { $usersAll } from 'src/app/auth/store/user.store';
import { BoardsService } from '../../boards.service';
import { Card } from '../../model/card.model';
import { MatIconModule } from '@angular/material/icon';
import { ColumnState } from '../../store/columns.store';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {

  @Input() card?: Card;
  public showTitleInput: boolean;
  public showDescriptionInput: boolean;
  public allUsers: Observable<User[]>;
  public titleFormControl: FormControl;
  public descriptionFormControl: FormControl;

  private boardService: BoardsService = inject(BoardsService);
  private columnState = inject(ColumnState)

  constructor() {
    this.showTitleInput = false;
    this.showDescriptionInput = false;
    this.allUsers = $usersAll.asObservable();
    this.titleFormControl = new FormControl(this.card?.title, {
      validators: [Validators.required],
    });
    this.descriptionFormControl = new FormControl(this.card?.description);
  }

  showTitleInputHandler(): void {
    this.showTitleInput = !this.showTitleInput;
  }

  showDescriptionInputHandler(): void {
    this.showDescriptionInput = !this.showDescriptionInput;
  }

  updateCardTitle(): void {
    const newTitle = this.titleFormControl.value;
    if (this.card!.title !== newTitle) {
      this.boardService
        .updateCard({ ...this.card!, title: newTitle })
        .subscribe((response) => {
          if (response.success) {
            this.card = response.data;
            this.columns.map((column) => {
              const index = column.cards.findIndex(
                (card) => card.id === response.data.id
              );
              column.cards[index] = response.data
            });
            this.showTitleInputHandler();
          }
        });
    }
  }

  updateCardDescription(): void {
    const newDescription = this.descriptionFormControl.value;
    if (this.card?.description !== newDescription) {
      this.boardService
        .updateCard({ ...this.card!, description: newDescription })
        .subscribe((response) => {
          if (response.success) {
            this.card = response.data;
            this.columns.map((column) => {
              const index = column.cards.findIndex(
                (card) => card.id === response.data.id
              );
              column.cards[index] = response.data;
            });
            this.showDescriptionInputHandler();
          }
        });
    }
  }

  updateCardPriority(newPriority: 'LOW' | 'MEDIUM' | 'HIGH') {
    if (this.card?.priority !== newPriority) {
      this.boardService
        .updateCard({ ...this.card!, priority: newPriority })
        .subscribe((response) => {
          if (response.success) {
            this.card = response.data;
            this.columns.map((column) => {
              const index = column.cards.findIndex(
                (card) => card.id === response.data.id
              );
              column.cards[index] = response.data;
            });
          }
        });
    }
  }

  manageCardUsers(user: User) {
    const index = this.card!.users!.findIndex(
      (u) => u.email === user.email
    );
    if (index > -1) this.card!.users!.splice(index, 1);
    else this.card!.users!.push(user);

    this.boardService
      .manageCardUsers(
        this.card!.id!,
        this.card!.users!.map((user) => user.email)
      )
      .subscribe((response) => {
        if (response.success) {
          // this.board.columns.map((column) => {
          //   const index = column.cards.findIndex(
          //     (card) => card.id === response.data.id
          //   );
          //   column.cards[index] = response.data;
          // });
        }
      });
  }

  userIn(user: User): boolean {
    return this.card?.users?.some((u) => u !== user) || false;
  }

  getUserInitials(name: string): string {
    return (
      name
        .match(/(^\S\S?|\b\S)?/g)
        ?.join('')
        .match(/(^\S|\S$)?/g)
        ?.join('')
        .toUpperCase() || ''
    );
  }

  get columns() {
    return this.columnState.getColumns();
  }
}