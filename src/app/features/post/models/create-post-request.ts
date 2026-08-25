export interface CreatePostRequest {
  body: string;
  image: File | null;
  privacy: string;
}
