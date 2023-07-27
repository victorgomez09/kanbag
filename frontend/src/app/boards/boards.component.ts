import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../auth/models/user.model';
import { $user } from '../auth/store/user.store';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { BoardsService } from './boards.service';
import { Board } from './model/board.model';
import { ModelFormGroup } from '../types';
import { CreateBoard } from './model/create-board.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  private boardService: BoardsService = inject(BoardsService);
  private fb: FormBuilder = inject(FormBuilder);

  public user: Observable<User>;
  public boards: WritableSignal<Board[]> = signal([]);
  public boardForm: ModelFormGroup<CreateBoard>;

  constructor() {
    this.user = $user.asObservable();
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
}
