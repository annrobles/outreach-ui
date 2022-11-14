import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { MainService } from "./main.service";

@Injectable()
export class JobService extends MainService {
  endpoint: string;

  constructor(
    http: HttpClient) {
        super(http);
        this.endpoint = 'api/jobs';
    }

    add(payload: any) {
        return this.post(`${this.endpoint}`, payload).pipe();
    }

    update(id: number, payload: any) {
        return this.put(`${this.endpoint}/${id}`, payload).pipe();
    }

    getList() {
        return this.get(`${this.endpoint}`).pipe();
    }

    getById(id: number) {
        return this.get(`${this.endpoint}/${id}`).pipe();
    }
}
