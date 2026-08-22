import { Data } from './login-response';

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: Data;
}
