export interface ToggleFollowResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  following: boolean;
  followersCount: number;
}
