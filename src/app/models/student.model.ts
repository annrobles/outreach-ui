import { Source } from "./user-profile-interface";

export interface Student {
  id: number,
  first_name: string,
  last_name: string,
  name?: string,
  about?: string,
  link?: string,
  email?: string,
  contact_number: string,
  student_skillset_id?: string,
  rank?: number,
  source: Source,
  completeSkills?: string,
  college_id?: number,
  college_other?: string,
  international?: number
  enable?: number
}
