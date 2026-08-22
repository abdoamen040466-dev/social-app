import { User } from '../../../core/models/user';

export interface LoginResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}
