import { Source } from "./user-profile-interface";

export interface Company {
  id?: number,
  student_id?: number;
  name: string,
  job_description?: string,
  link?: string,
  email?: string,
  contact_number: string,
  status: number,
  created_at?: Date,
  source: Source,
  other_specify: string,
  skillsets?: CompanySkillsets[]
}

export interface CompanySkillsets {
  id?: number,
  company_id?: number,
  skillset_id?: number,
  total_years_experience?: number | null,
  name: string,
  skill: any
}
