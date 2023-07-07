import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateBoard } from './model/create-board.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types';
import { Board } from './model/board.model';
import { Observable } from 'rxjs';
import { CreateColumn } from './model/create-column.model';
import { Column } from './model/column.model';

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

  createColumn(data: CreateColumn): Observable<ApiResponse<Column>> {
    return this.http.post<ApiResponse<Column>>(`${environment.apiUrl}/columns`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(environment.tokenStorageKey)}`
      }
    })
  }
}
