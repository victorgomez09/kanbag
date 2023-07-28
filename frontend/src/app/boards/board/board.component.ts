import {
  CdkDragDrop,
  CdkDragPlaceholder,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/models/user.model';
import { UserState } from 'src/app/auth/store/user.store';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { BoardsService } from '../boards.service';
import { ColumnComponent } from '../components/column/column.component';
import { TaskDetailsComponent } from '../components/task-details/task-details.component';
import { Board } from '../model/board.model';
import { Card } from '../model/card.model';
import { Column } from '../model/column.model';
import { ColumnState } from '../store/columns.store';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkDragPlaceholder,
    MatIconModule,
    NavbarComponent,
    ColumnComponent,
    TaskDetailsComponent
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private boardService: BoardsService = inject(BoardsService);
  private usersService: AuthService = inject(AuthService);
  private columnState: ColumnState = inject(ColumnState);
  private userState: UserState = inject(UserState);

  public nameFormControl: FormControl;
  public titleFormControl: FormControl;
  public descriptionFormControl: FormControl;
  public board!: Board;
  public members: WritableSignal<User[]>;
  public showCreateColumnInput: boolean;
  public showTitleInput: boolean;
  public showDescriptionInput: boolean;
  public selectedCard?: Card;
  public error: boolean;

  constructor() {
    this.nameFormControl = new FormControl('', {
      validators: [Validators.required],
    });
    this.titleFormControl = new FormControl(this.selectedCard?.title, {
      validators: [Validators.required],
    });
    this.descriptionFormControl = new FormControl(
      this.selectedCard?.description,
      {
        validators: [Validators.required],
      }
    );
    this.members = signal([]);
    this.showCreateColumnInput = false;
    this.showTitleInput = false;
    this.showDescriptionInput = false;
    this.error = false;
  }

  ngOnInit(): void {
    this.boardService.findById(this.route.snapshot.paramMap.get('id')! as unknown as number).subscribe((result) => {
      if (result.success) {
        this.board = result.data;

        if (!result.data.members.some(u => u.email === this.user.email)) this.router.navigate(['/boards']);

        this.members.set(result.data.members);
        this.columnState.setColumns(result.data.columns);
      }
    });

    this.usersService.getAll().subscribe((result) => {
      if (result.success) this.userState.setUsers(result.data);
    });
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
          this.columnState.updateColumns(result.data);
          this.nameFormControl.reset();
          this.showCreateColumnInput = false;
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

  deleteColumn(id: number) {
    this.boardService.deleteColumn(id).subscribe((result) => {
      if (result.success) {
        const index = this.board.columns.findIndex(
          (column) => column.id === id
        );
        this.board.columns.splice(index, 1);
      }
    });
  }

  manageBoardUsers(user: User) {
    const index = this.board.members.findIndex((u) => u.email === user.email);
    if (index > -1) this.board.members.splice(index, 1);
    else this.board.members.push(user);

    this.boardService
      .manageBoardUsers(
        this.board.id,
        this.board.members.map((u) => u.email)
      )
      .subscribe((response) => {
        if (response.success) {
          this.members.set(response.data.members);
        }
      });
  }

  get user(): User {
    return this.userState.getUser();
  }

  get columns(): Column[] {
    return this.columnState.getColumns();
  }

  get allUsers(): User[] {
    return this.userState.getUsers();
  }
}
