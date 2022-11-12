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

  update(id: number, payload: any) {
    return this.put(`${this.endpoint}/${id}`, payload).pipe();
  }

  getById(id: number) {
    return this.get(`${this.endpoint}/${id}`).pipe();
  }

  getList() {
    return this.get(`${this.endpoint}`).pipe();
  }
}

