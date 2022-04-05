import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { ListApiService } from '../../services/list-api.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  perPage: number = 2;
  lastLoadedPage: number = 1;
  users: IUser[] = [];

  constructor(public listApiService: ListApiService) {}

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.listApiService
      .getUsers(this.lastLoadedPage, this.perPage)
      .subscribe((users) => {
        this.addUser(users);
      });
  }

  loadMore(): void {
    this.lastLoadedPage++;
    this.getList();
  }

  clear(): void {
    this.users = [];
    this.lastLoadedPage = 0;
  }

  // deep clone is mandatory
  private addUser(users: IUser[]): void {
    this.users = this.deepClone(this.users);
    this.users.push(...users);
  }

  private deepClone = <T>(object: T): T => JSON.parse(JSON.stringify(object));
}
