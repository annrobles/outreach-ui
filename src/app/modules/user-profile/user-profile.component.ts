import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserProfileInfoType } from "../../models/user-profile-info-type.enum";
import { UserBasicInformation,
  UserLocation,
  UserExperience,
  UserEducation,
  UserLanguage,
  Skill,
  UserSkill } from "../../models/user-profile-interface";

import { AuthService } from '../../services/auth.service';
import { StudentService } from "../../services/student.service";
import { UserLocationService } from "../../services/user-location.service";
import { UserExperienceService } from "../../services/user-experience.service";
import { UserEducationService } from "../../services/user-education.service";
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
    title: "",
    link: "",
    availability: {
      morning: false,
      afternoon: false,
      evening: false
    },
    about: ""
  };

  userLocation: UserLocation = {
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal_code: "",
    country: ""
  }

  userExperience: UserExperience = {
    title: "",
    company_name: "",
    start_date: "",
    end_date: "",
    location: "",
    description: ""
  }

  userEducation: UserEducation = {
    name: "",
    degree: "",
    field_study: "",
    start_date: "",
    end_date: "",
    grade: "",
    description: ""
  }

  userLanguage: UserLanguage = {
    language: {
      english: false,
      french: false,
      other_specify: false
    },
    other_specify: ""
  }

  newSkill: UserSkill = {
    id: 0,
    name: "",
    total_years_experience: 0
  }
  total_years_experience: number | null = null;

  profileSkills: UserSkill[] = [];
  skillsets: any[] = [];

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private studentSvc: StudentService,
    private messageService: MessageService,
    private userLocationSvc: UserLocationService,
    private userExperienceSvc: UserExperienceService,
    private userEducationSvc: UserEducationService,
    private skillsetSvc: SkillsetService,
    private studentSkillsetSvc: StudentSkillsetService
  ) {
    this.currentRouteUrl = router.url;
   }

  ngOnInit(): void {
    let id = this.authSvc.user.id;

    if (id) {
      this.studentSvc.getById(parseInt(id)).subscribe((result) => {
        if (result.status) {
          this.userBasicInformation = result.student;
          this.userBasicInformation.availability = JSON.parse(result.student.availability);
        }
      })

      this.userLocationSvc.getById(parseInt(id)).subscribe((result) => {
        if (result.status) {
          this.userLocation = result.studentLocation;
        }
      })

      // TO DO - get all the skillset of the student
      // this.studentSkillsetSvc.getList(parseInt(id)).subscribe((result) => {
      //   if (result.status) {
      //     this.profileSkills = result.skillset;
      //   }
      // })
    }

    this.skillsetSvc.getList().subscribe((result) => {
      if (result.status) {
        this.skillsets = result.skillset;
      }
    })
  }

  ngOnDestroy(){
  }

  userProfileSubmit(data: any, profileType: UserProfileInfoType) {
    let userInfo = JSON.parse(localStorage.getItem("user") || "");

    data.user_id = userInfo.id;

    switch (profileType) {
      case UserProfileInfoType.Location: {
        this.userLocationSvc.add(data).subscribe((result) => {
          if (result.status) {
            this.messageService.add({severity:'success', summary: result.message});
            this.userLocation = result.studentLocation;
          }
        });
        break
      }
      case UserProfileInfoType.Experience: {
        this.userExperienceSvc.add(data).subscribe((result) => {
          if (result.status) {
            this.messageService.add({severity:'success', summary: result.message});
            this.userExperience = result.studentExperiences;
          }
        });
        break
      }
      case UserProfileInfoType.Education: {
        break
      }
      case UserProfileInfoType.Languages: {
        break
      }
      case UserProfileInfoType.Documents: {
        break
      }
      case UserProfileInfoType.Agreements: {
        break
      }
      default: {
        data.availability = JSON.stringify(data.availability);
        this.studentSvc.add(data).subscribe((result) => {
          if (result.status) {
            this.messageService.add({severity:'success', summary: result.message});
            this.userBasicInformation = result.student;
          }          
        });
        break
      }
    }
  }

  addSkill() {
    let userInfo = JSON.parse(localStorage.getItem("user") || "");

    this.profileSkills.push({
      skillset_id: this.newSkill.skillset_id,
      name: this.newSkill.name,
      total_years_experience: this.total_years_experience
    });

    this.studentSkillsetSvc.add({
      user_id: userInfo.id,
      skillset_id: this.newSkill.skillset_id,
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

  }

}
