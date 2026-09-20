export interface UnreadCountsResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  unreadCount: number;
}
