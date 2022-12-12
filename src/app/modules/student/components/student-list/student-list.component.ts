import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { College } from "../../../../models/college.model";
import { Student } from '../../../../models/student.model';
import { StudentService } from '../../../../services/student.service';
import { UserAccessType } from "../../../../models/user-access-type.enum";
import { AuthService } from '../../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CollegeService } from "../../../../services/college.service";
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
  userAccessType = UserAccessType;
  userType: number =  UserAccessType.None;
  loading: boolean = false;
  availability: any[];
  campus: any[];
  studentType: any[];
  colleges: {label: string, value: number}[] = [];

  constructor(
    private router: Router,
    private studentSvc: StudentService,
    private authSvc: AuthService,
    private messageSvc : MessageService,
    private collegeSvc: CollegeService
  ) { 
    this.availability = [{label: "Available", value: 1}, {label: "UnAvailable", value: 0}];

    this.studentType = [{label: "Domestic", value: 0}, {label: "International", value: 1}];
    this.userType = this.authSvc.user.user_type_id;
  }

  ngOnInit(): void {
    let students:Student[] = [];
    this.loading = true;
    this.studentSvc.getList().subscribe((result) => {
      if (result.status) {
        students = result.student;
        this.students = students.filter((item) => item.first_name != null);
        this.loading = false;
      }
    });

    this.collegeSvc.getList().subscribe((result) => {
      if (result.status) {
        let colleges: College[] = result.colleges;

        colleges.forEach((college) => {
          if (college.name && college.id) {
            this.colleges.push({"label": college.name, "value": college.id});
          }          
        });
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

  deleteApplicant(student: Student) {
    if (student.id) {
      this.studentSvc.deleteById(student.id).subscribe((result) => {
        if (result.status) {
          this.messageSvc.add({severity:'success', summary: result.message});
        }
      })
    }
  }
}
