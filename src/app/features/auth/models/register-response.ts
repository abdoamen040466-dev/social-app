export interface RegisterResponse {
  success: boolean;
  message: string;
  data: RegisterData;
}

interface RegisterData {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: RegisterUser;
}

interface RegisterUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string | null;
  cover: string | null;
}
