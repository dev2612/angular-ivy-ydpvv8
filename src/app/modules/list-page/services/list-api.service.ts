import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class ListApiService {
  constructor(public httpClient: HttpClient) {}

  getUsers(page: number,limit: number): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(
      `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
    );
  }
}
