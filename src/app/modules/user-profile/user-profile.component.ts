import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserProfileInfoType } from "../../models/user-profile-info-type.enum";
import { UserBasicInformation,
  Skill,
  UserSkill } from "../../models/user-profile-interface";

import { AuthService } from '../../services/auth.service';
import { StudentService } from "../../services/student.service";
import { SkillsetService } from "../../services/skillset.service";
import { StudentSkillsetService } from "../../services/student-skillset.service";
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  currentRouteUrl?: string;
  showSkillDropDown = false;
  UserProfileInfoType = UserProfileInfoType;

  userBasicInformation: UserBasicInformation = {
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    link: "",
    about: "",
    user_id: 0,
    availability: false
  };

  newSkill: UserSkill;
  total_years_experience: number | null = null;

  profileSkills: UserSkill[] = [];
  skillsets: any[] = [];
  availability: any[] = [{"label": "Available", "value": 1}, {"label": "UnAvailable", "value": 0}]
  user: any;

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private studentSvc: StudentService,
    private messageService: MessageService,
    private skillsetSvc: SkillsetService,
    private studentSkillsetSvc: StudentSkillsetService
  ) {
    this.currentRouteUrl = router.url;    
   }

  ngOnInit(): void {
    this.user = this.authSvc.user;

    this.skillsetSvc.getList().subscribe((result) => {
      if (result.status) {
        this.skillsets = result.skillset;
      }
    })

    if (this.user) {
      this.userBasicInformation = this.user.student;
      console.log("this.userBasicInformation ", this.userBasicInformation)
      this.studentSvc.getById(this.authSvc.user.student.id).subscribe((result) => {
        if (result.status) {
          this.profileSkills = result.student.skillsets;
        }
      })
    }
  }

  ngOnDestroy(){
  }

  userProfileSubmit(data: any) {
    this.studentSvc.update(this.user.student.id, data).subscribe(
      (result) => {
        if (result.status) {
          this.messageService.add({severity:'success', summary: result.message});
          this.userBasicInformation = result.student;
          this.authSvc.user.student = result.student;
          localStorage.setItem("user", `${JSON.stringify(this.authSvc.user)}`);
        }
      },
      (errors) => {
        if (errors["error"].hasOwnProperty("errors")) {
          this.messageService.add({severity:'error', summary: errors["error"]["errors"]["email"][0]});
        }
        else {
          this.messageService.add({severity:'error', summary: errors["error"].message});
        }
      }
    );
  }

  addSkill() {
    this.profileSkills.push({
      skillset_id: this.newSkill.id,
      name: this.newSkill.name,
      total_years_experience: this.total_years_experience,
      skill: this.newSkill
    });
    
    this.studentSkillsetSvc.add({
      student_id: this.authSvc.user.student.id,
      skillset_id: this.newSkill.id,
      name: this.newSkill.name,
      total_years_experience: this.total_years_experience
    }).subscribe((result) => {
      if (result.status) {
        this.messageService.add({severity:'success', summary: result.message});
        this.newSkill = {
          id: 0,
          name: "",
          total_years_experience: null
        }
        this.total_years_experience = null;
      }
    });
  }

  deleteSkill(profileSkill: UserSkill) {
    if (profileSkill.id) {
      this.studentSkillsetSvc.deleteById(profileSkill.id).subscribe((result) => {
        if (result.status) {
          this.messageService.add({severity:'success', summary: result.message});
          this.profileSkills = this.profileSkills.filter((skill) => skill.id != profileSkill.id);
        }
      })
    }
  }

}
