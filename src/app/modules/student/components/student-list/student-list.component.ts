import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../../../../models/student.model';
import { StudentService } from '../../../../services/student.service';

@UntilDestroy()
@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.less']
})
export class StudentListComponent implements OnInit, OnDestroy {

  @Input() showRank: boolean = false;
  @Input() containerClass: string = "container";
  @Input() reorderableColumns: boolean = false;

  students:Student[] = []

  loading: boolean = false;

  constructor(
    private router: Router,
    private studentSvc: StudentService
  ) { }

  ngOnInit(): void {
    this.studentSvc.getList().subscribe((result) => {
      if (result.status) {
        this.students = result.student;
      }
    });
  }

  ngOnDestroy(){
  }

  getName(first_name: string, last_name: string) {
    return first_name + " " + last_name;
  }

  viewStudent(student: Student) {
    this.router.navigateByUrl('/student-view/' + student.id);
  }

  getSearchInputValue(event: any){
    return (event.target as HTMLInputElement).value;
  }
}
