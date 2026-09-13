export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  token: string;
  tokenType: string;
  expiresIn: string;
}
