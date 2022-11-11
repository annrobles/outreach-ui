import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from "./main.service";

@Injectable()
export class StudentService extends MainService {
  endpoint: string;

  constructor(
    http: HttpClient) {
        super(http);
        this.endpoint = 'api/student';
    }

  add(payload: any) {
    return this.post(`${this.endpoint}`, payload).pipe();
  }

  getById(id: number) {
    return this.get(`${this.endpoint}/${id}`).pipe();
  }
}
