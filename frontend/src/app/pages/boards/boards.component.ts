import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { Board, CreateBoard } from 'src/app/core/models/board.model';
import { User } from 'src/app/core/models/user.model';
import { BoardsService } from 'src/app/core/services/boards.service';
import { UserState } from 'src/app/core/store/user.store';
import { ModelFormGroup } from 'src/app/types';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  private boardService: BoardsService = inject(BoardsService);
  private userState: UserState = inject(UserState);

  public boards: WritableSignal<Board[]> = signal([]);
  public boardForm: ModelFormGroup<CreateBoard>;

  constructor() {
    this.boardForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.boardService.findByUser().subscribe((result) => {
      if (result.success) this.boards.set(result.data);
    });
  }

  submit() {
    this.boardService
      .createBoard(
        this.boardForm.value as Required<typeof this.boardForm.value>
      )
      .subscribe((result) => {
        if (result.success) this.boards.update(oldArray => [...oldArray, result.data])
      });
  }

  get f() {
    return this.boardForm.controls;
  }

  get user(): User {
    return this.userState.getUser();
  }
}
