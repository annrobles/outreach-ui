import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MainService } from "./main.service";

@Injectable()
export class CollegeService extends MainService {
  endpoint: string;

  constructor(
    http: HttpClient) {
        super(http);
        this.endpoint = 'api/college';
    }

    getList() {
        return this.get(`${this.endpoint}`).pipe();
    }
}
