export enum UserType {
  PATIENT = 'PATIENT',
  RESEARCHER = 'RESEARCHER',
}

export interface User {
  id: string;
  email: string;
  userType: UserType;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  patient?: PatientProfile;
  researcher?: ResearcherProfile;
}

export interface PatientProfile {
  id: string;
  userId: string;
  conditions?: string[];
  age?: number;
  location?: string;
  bio?: string;
}

export interface ResearcherProfile {
  id: string;
  userId: string;
  institution?: string;
  specialization?: string[];
  bio?: string;
  orcidId?: string;
  publications?: number;
}
