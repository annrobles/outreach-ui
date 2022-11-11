import { Availability } from "./user-profile-interface";

export interface Company {
  id?: number,
  user_id?: number;
  name: string,
  about?: string,
  link?: string,
  email?: string,
  contact_number: string,
  status: number,
  created_at?: Date,
  availability: Availability,
  companySkillsetNeed?: CompanySkillsetNeed[]
}

export interface CompanySkillsetNeed {
  id?: number,
  company_id?: number,
  skillset_id?: number,
  total_years_experience?: number
}
