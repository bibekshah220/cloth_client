import type { Role, Gender } from './enums';

export interface User {
  _id: string;
  name: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  profile_image?: { path: string; public_id: string };
  role: Role;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  phone?: string;
}
