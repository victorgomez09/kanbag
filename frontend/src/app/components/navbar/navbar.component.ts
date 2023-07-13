import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModelFormGroup } from 'src/app/types';
import { CreateBoard } from 'src/app/boards/model/create-board.model';
import { BoardsService } from 'src/app/boards/boards.service';
import { $boards } from 'src/app/boards/store/boards.store';
import { Observable, Subscription, take } from 'rxjs';
import { RouterModule } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';
import { $user } from 'src/app/auth/store/user.store';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ThemeSwitcherComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @ViewChild('createBoardModal') private modal!: HTMLDialogElement;
  private fb: FormBuilder = inject(FormBuilder);
  private boardService: BoardsService = inject(BoardsService);

  public boardForm: ModelFormGroup<CreateBoard>;
  public user: Observable<User>;
  public userInitials?: string;

  constructor() {
    this.boardForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      description: [''],
    });

    this.user = $user.asObservable();
    this.user.subscribe((user) => {
      this.userInitials = user.displayName
        .match(/(^\S\S?|\b\S)?/g)
        ?.join('')
        .match(/(^\S|\S$)?/g)
        ?.join('')
        .toUpperCase();
    });
  }

  submit() {
    this.boardService
      .createBoard(
        this.boardForm.value as Required<typeof this.boardForm.value>
      )
      .subscribe((result) => {
        if (result.success) {
          $boards.pipe(take(1)).subscribe((oldArray) => {
            const newArray = [...oldArray, result.data];
            $boards.next(newArray);
          });

          (
            document.getElementById('createBoardModal') as HTMLDialogElement
          ).close();
        }
      });
  }

  get f() {
    return this.boardForm.controls;
  }
}
