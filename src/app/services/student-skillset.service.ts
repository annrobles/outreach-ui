import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MainService } from "./main.service";

@Injectable()
export class StudentSkillsetService extends MainService {
  endpoint: string;

  constructor(
    http: HttpClient) {
        super(http);
        this.endpoint = 'api/studentSkillset';
    }

    add(payload: any) {
        return this.post(`${this.endpoint}`, payload).pipe();
    }

    update(payload: any) {
        return this.put(`${this.endpoint}`, payload).pipe();
    }

    getList() {
        return this.get(`${this.endpoint}`).pipe();
    }

    getById(id: number) {
        return this.get(`${this.endpoint}/${id}`).pipe();
    }

    deleteById(id: number) {
        return this.delete(`${this.endpoint}/${id}`).pipe();
    }
}
