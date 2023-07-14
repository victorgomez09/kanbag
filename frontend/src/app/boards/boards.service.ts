import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateBoard } from './model/create-board.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types';
import { Board } from './model/board.model';
import { Observable } from 'rxjs';
import { CreateColumn } from './model/create-column.model';
import { Column } from './model/column.model';
import { Card, UpdateCardOrder } from './model/card.model';
import { CreateCard } from './model/create-card.model';
import { User } from '../auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private http: HttpClient = inject(HttpClient);

  findByUser(): Observable<ApiResponse<Board[]>> {
    return this.http.get<ApiResponse<Board[]>>(`${environment.apiUrl}/boards`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          environment.tokenStorageKey
        )}`,
      },
    });
  }

  findById(id: number): Observable<ApiResponse<Board>> {
    return this.http.get<ApiResponse<Board>>(
      `${environment.apiUrl}/boards/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }

  createBoard(data: CreateBoard): Observable<ApiResponse<Board>> {
    return this.http.post<ApiResponse<Board>>(
      `${environment.apiUrl}/boards`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }

  manageBoardUsers(id: number, data: string[]): Observable<ApiResponse<Board>> {
    return this.http.put<ApiResponse<Board>>(
      `${environment.apiUrl}/boards/${id}/manageUsers`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }

  createColumn(data: {
    boardId: number;
    name: string;
  }): Observable<ApiResponse<Column>> {
    return this.http.post<ApiResponse<Column>>(
      `${environment.apiUrl}/columns`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }

  updateColumn(data: Column): Observable<ApiResponse<Column>> {
    return this.http.put<ApiResponse<Column>>(
      `${environment.apiUrl}/columns/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }

  deleteColumn(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${environment.apiUrl}/columns/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }

  updateColumnsOrder(data: Column[]): Observable<ApiResponse<Column[]>> {
    return this.http.put<ApiResponse<Column[]>>(
      `${environment.apiUrl}/columns/updateOrder`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }

  createCard(data: Card): Observable<ApiResponse<Card>> {
    return this.http.post<ApiResponse<Card>>(
      `${environment.apiUrl}/cards`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }

  updateCard(data: Card): Observable<ApiResponse<Card>> {
    return this.http.put<ApiResponse<Card>>(
      `${environment.apiUrl}/cards/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }

  updateCardsOrder(data: Card[]): Observable<ApiResponse<Card[]>> {
    return this.http.put<ApiResponse<Card[]>>(
      `${environment.apiUrl}/cards/updateOrder`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }

  updateCardsOrderAndColumns(data: {
    prevColumn: Card[];
    currentColumn: Card[];
  }): Observable<ApiResponse<Card[]>> {
    return this.http.put<ApiResponse<Card[]>>(
      `${environment.apiUrl}/cards/updateOrderAndColumn`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.tokenStorageKey
          )}`,
        },
      }
    );
  }
}
