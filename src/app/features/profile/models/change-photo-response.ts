export interface ChangePhotoResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  photo: string;
  postId: string;
}
