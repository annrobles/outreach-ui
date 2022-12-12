import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from "./main.service";

@Injectable()
export class UserService extends MainService {
  endpoint: string;

  constructor(
    http: HttpClient) {
        super(http);
        this.endpoint = 'api/user';
    }

  update(id: number, payload: any) {
    return this.put(`${this.endpoint}/${id}`, payload).pipe();
  }
}
