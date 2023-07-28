import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { Card } from '../../models/card.model';
import { User } from '../../models/user.model';
import { BoardsService } from '../../services/boards.service';
import { ColumnState } from '../../store/columns.store';
import { UserState } from '../../store/user.store';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {

  private boardService: BoardsService = inject(BoardsService);
  private columnState: ColumnState = inject(ColumnState);
  private userState: UserState = inject(UserState);

  @Input() card?: Card;
  public showTitleInput: boolean;
  public showDescriptionInput: boolean;
  public titleFormControl: FormControl;
  public descriptionFormControl: FormControl;

  constructor() {
    this.showTitleInput = false;
    this.showDescriptionInput = false;
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
          this.columns.map((column) => {
            const index = column.cards.findIndex(
              (card) => card.id === response.data.id
            );
            column.cards[index] = response.data;
            this.card!.users = response.data.users
          });
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

  get allUsers(): User[] {
    return this.userState.getUsers();
  }
}
