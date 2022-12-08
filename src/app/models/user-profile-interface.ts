export interface UserBasicInformation {
  id?: number,
  user_id?: number,
  first_name: string,
  last_name: string,
  email: string,
  contact_number: string,
  link: string,
  about: string,
  availability: boolean,
  international?: number,
  campus_id?: number,
  campus_other?:string
}

export interface Source {
  placement: boolean,
  coop: boolean,
  other: boolean
}

export interface Skill {
  id: number,
  name: string
}

export interface UserSkill {
  id?: number,
  skillset_id?: number,
  name: string,
  total_years_experience: number | null,
  skill?: any
}

export interface UserProfileNavItem {
  name: string,
  link: string,
  active: boolean
}
